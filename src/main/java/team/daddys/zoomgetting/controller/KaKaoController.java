package team.daddys.zoomgetting.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClientBuilder;
import org.json.simple.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

@RequestMapping("/api")
@Controller
public class KaKaoController {
    @GetMapping("kakaoLogin")
    public String kakaoAuth() {
        return "loginSuccess";
    }

    @GetMapping("/getAuth")
    public String getOuathKakao(){
        String url = "https://kauth.kakao.com/oauth/authorize?client_id=12dc1b7826f728c3482e75d5ea25f5a1&redirect_uri=http://localhost:8085/api/login/oauth_kakao&response_type=code";

        return "redirect:" + url;
    }

    // 카카오 연동정보 조회
    @RequestMapping(value="/login/oauth_kakao",produces="application/json",method= {RequestMethod.GET, RequestMethod.POST})
    public String oauthKakao(@RequestParam("code")String code,
                                               RedirectAttributes ra,
                                               HttpSession session,
                                               HttpServletResponse response,
                                               Model model) throws Exception {
        System.out.println("#########" + code);
        String access_Token = getAccessToken(code);
        System.out.println("###access_Token#### : " + access_Token);

        // access_token을 통해 사용자 정보 요청
        JsonNode userInfo = getKakaoUserInfo(access_Token);

        // Get id
        String id = userInfo.path("id").asText();
        String name = null;
        String email = null;

        // 유저정보 카카오에서 가져오기 Get properties
        JsonNode properties = userInfo.path("properties");
        JsonNode kakao_account = userInfo.path("kakao_account");

        name = properties.path("nickname").asText();
        email = kakao_account.path("email").asText();

        System.out.println("id : " + id);
        System.out.println("name : " + name);
        System.out.println("email : " + email);

//        HashMap<String, Object> userInfo = getUserInfo(access_Token);
//        System.out.println("###access_Token#### : " + access_Token);
//        System.out.println("###userInfo#### : " + userInfo.get("email"));
//        System.out.println("###nickname#### : " + userInfo.get("nickname"));

        return "loginSuccess";
    }

    // 카카오 로그인 access_token 리턴
    public String getAccessToken(String code) throws Exception {

        String accessToken = "";

        // restTemplate을 사용하여 API 호출
        RestTemplate restTemplate = new RestTemplate();
        String reqUrl = "https://kauth.kakao.com/oauth/token";
        URI uri = URI.create(reqUrl);

        HttpHeaders headers = new HttpHeaders();

        MultiValueMap<String, Object> parameters = new LinkedMultiValueMap<String, Object>();
        parameters.set("grant_type", "authorization_code");
        parameters.set("client_id", "12dc1b7826f728c3482e75d5ea25f5a1");
        parameters.set("redirect_uri", "http://localhost:8085/api/login/oauth_kakao");
        parameters.set("code", code);

        HttpEntity<MultiValueMap<String, Object>> restRequest = new HttpEntity<>(parameters, headers);
        ResponseEntity<JSONObject> apiResponse = restTemplate.postForEntity(uri, restRequest, JSONObject.class);
        JSONObject responseBody = apiResponse.getBody();

        accessToken = (String) responseBody.get("access_token");

        return accessToken;
    }

    public JsonNode getKakaoUserInfo(String accessToken) {

        final String RequestUrl = "https://kapi.kakao.com/v2/user/me";
        final HttpClient client = HttpClientBuilder.create().build();
        final HttpPost post = new HttpPost(RequestUrl);

        // add header
        post.addHeader("Authorization", "Bearer " + accessToken);

        JsonNode returnNode = null;

        try {
            final HttpResponse response = client.execute(post);
            final int responseCode = response.getStatusLine().getStatusCode();

            System.out.println("\nSending 'POST' request to URL : " + RequestUrl);
            System.out.println("Response Code : " + responseCode);

            // JSON 형태 반환값 처리
            ObjectMapper mapper = new ObjectMapper();
            returnNode = mapper.readTree(response.getEntity().getContent());

        } catch (ClientProtocolException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            // clear resources
        }

        return returnNode;
    }

    public HashMap<String, Object> getUserInfo (String access_Token) {

        //요청하는 클라이언트마다 가진 정보가 다를 수 있기에 HashMap타입으로 선언
        HashMap<String, Object> userInfo = new HashMap<>();
        String reqURL = "https://kapi.kakao.com/v2/user/me";
        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");

            //    요청에 필요한 Header에 포함될 내용
            conn.setRequestProperty("Authorization", "Bearer " + access_Token);

            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("response body : " + result);

            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            JsonObject properties = element.getAsJsonObject().get("properties").getAsJsonObject();
            JsonObject kakao_account = element.getAsJsonObject().get("kakao_account").getAsJsonObject();

            String nickname = properties.getAsJsonObject().get("nickname").getAsString();
            String email = kakao_account.getAsJsonObject().get("email").getAsString();

            userInfo.put("nickname", nickname);
            userInfo.put("email", email);

        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return userInfo;
    }


}

package team.daddys.zoomgetting.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import team.daddys.zoomgetting.domain.DetailInfo;
import team.daddys.zoomgetting.domain.Member;
import team.daddys.zoomgetting.service.MainService;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RequestMapping("/api")
@Controller
public class MemberController {

    @Autowired
    private MainService service;

    @GetMapping("memberList")
    public String memberList() {
        return "memberList";
    }
    @PostMapping("detailInfo")
    public ResponseEntity<?> detailInfo(HttpServletRequest request, DetailInfo info){
        System.out.println(info);
        // todo :  header 에 JWT 토큰주면 토큰으로 유저를 특정하는 방식으로 수정할 예정
        String userName = request.getHeader("user_name");
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }
}

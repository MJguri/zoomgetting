package team.daddys.zoomgetting.domain;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class DetailInfo {
    private String photo;
    private String sex;
    private String location;
    private List<String> interest;
    private List<String> personality;
    private String job;
    private String mbti;
}

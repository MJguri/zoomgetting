package team.daddys.zoomgetting.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Member {

    private int member_no;
    private String nickname;
    private int role;
    private String email;
    private int gender;
    private int age_group;
    private String birthday;

}

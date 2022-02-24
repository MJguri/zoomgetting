package team.daddys.zoomgetting.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import team.daddys.zoomgetting.domain.Member;
import team.daddys.zoomgetting.service.MainService;

import java.util.List;

@Controller
public class MemberController {

    @Autowired
    private MainService service;

    @GetMapping("memberList")
    public String memberList() {

        return "memberList";
    }
}

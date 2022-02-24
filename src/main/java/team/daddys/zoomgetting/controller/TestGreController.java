package team.daddys.zoomgetting.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import team.daddys.zoomgetting.domain.TestGre;
import team.daddys.zoomgetting.service.MainServiceImpl;

import java.util.List;

@RestController
public class TestGreController {

    @Autowired
    MainServiceImpl mainService;

    @PostMapping(value = "/testGre")
    public List<TestGre> test1(){

        List<TestGre> list = mainService.selectPostgreAll();

        return list;
    }
}

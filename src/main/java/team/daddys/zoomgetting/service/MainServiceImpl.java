package team.daddys.zoomgetting.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team.daddys.zoomgetting.domain.Member;
import team.daddys.zoomgetting.mapper.MainMapper;

import java.util.List;

@Service
public class MainServiceImpl implements MainService{

    @Autowired
    MainMapper mapper;

    @Override
    public List<Member> selectAllMember() {
        return mapper.selectAll();
    }
}

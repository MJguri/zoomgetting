package team.daddys.zoomgetting.mapper;

import org.apache.ibatis.annotations.Mapper;
import team.daddys.zoomgetting.domain.Member;
import team.daddys.zoomgetting.domain.TestGre;

import java.util.List;

@Mapper
public interface MainMapper {

    List<Member> selectAll();

    List<TestGre> selectPostgreAll();


}

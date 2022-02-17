package team.daddys.zoomgetting;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
@MapperScan(basePackages = "team.daddys.zoomgetting.mapper")
public class ZoomgettingApplication {

	public static void main(String[] args) {
		SpringApplication.run(ZoomgettingApplication.class, args);


	}

}

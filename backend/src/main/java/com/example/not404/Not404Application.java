package com.example.not404;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;
@SpringBootApplication
@MapperScan(basePackages = "com.example.not404.repository")
public class Not404Application {
	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.configure().filename("setting.env").directory("./").load();
		dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));
		SpringApplication.run(Not404Application.class, args);
	}

}

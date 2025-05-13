package com.project.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.repository.CommonMapper;

@Service
public class CommonService {
    @Autowired
    private CommonMapper commonMapper;
    public List<Map<String, Object>> getCommonCodeList(String commonCode) {
        List<Map<String, Object>> list = commonMapper.selectCommonCodeList(commonCode);
        return list;
    }
}

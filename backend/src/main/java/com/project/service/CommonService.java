package com.project.service;

import java.util.ArrayList;
import java.util.HashMap;
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
        List<Map<String, Object>> list = commonMapper.selectCommonCode(commonCode);
        List<Map<String, Object>> result = new ArrayList<>();
        for (Map<String, Object> map : list) {
            Map<String, Object> resultMap = new HashMap<>();
            resultMap.put("commonCode", map.get("COMMON_CODE"));
            resultMap.put("commonName", map.get("COMMON_NAME"));
            resultMap.put("commonValue", map.get("COMMON_VALUE"));
            result.add(resultMap);
        };
        return result;
    }
}

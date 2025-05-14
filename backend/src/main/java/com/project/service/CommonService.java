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
    public Map<String, List<Map<String, Object>>> getCommonCodeList(String commonCode) {
        List<Map<String, Object>> list = commonMapper.selectCommonCode(commonCode);
        Map<String, List<Map<String, Object>>> result = new HashMap<>();

        for (Map<String, Object> map : list) {
            String groupKey = (String) map.get("COMMON_CODE");
            Map<String, Object> codeMap = new HashMap<>();
            codeMap.put("commonCode", map.get("COMMON_CODE"));
            codeMap.put("commonName", map.get("COMMON_NAME"));
            codeMap.put("commonValue", map.get("COMMON_VALUE"));

            result.computeIfAbsent(groupKey, k -> new ArrayList<>()).add(codeMap);
        };
        return result;
    }
}

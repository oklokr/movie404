package com.project.util;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateFormatUtil {
    /**
     * Date 객체를 원하는 포맷의 문자열로 변환
     *
     * @param date Date 객체
     * @param toFormat 출력 포맷 (예: "yyyy-MM-dd", "yyyy-MM-dd HH:mm:ss")
     * @return 변환된 날짜 문자열, 실패 시 null
     */
    public static String formatDate(Date date, String toFormat) {
        if (date == null || toFormat == null) return null;

        try {
            SimpleDateFormat formatter = new SimpleDateFormat(toFormat);
            return formatter.format(date);
        } catch (IllegalArgumentException e) {
            System.err.println("DateFormatUtil Error: " + e.getMessage());
            return null;
        }
    }
}
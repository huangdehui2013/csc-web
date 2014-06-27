package com.saic.csc.web.converter;

import java.util.Date;

import org.springframework.core.convert.converter.Converter;

/**
 * 〈一句话功能简述〉<br> 
 * 〈功能详细描述〉
 *
 * @author 陈琦
 * @see [相关类/方法]（可选）
 * @since [产品/模块版本] （可选）
 */
public class DateStringConverter extends DateConverterBase implements Converter<Date, String> {

    @Override
    public String convert(Date source) {
        if (source == null) {
            return "";
        }

        return getDateFormat().format(source);
    }

}

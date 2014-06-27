package com.saic.csc.web.converter;

import java.text.ParseException;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.convert.converter.Converter;

import com.saic.csc.service.exception.CSCErrorCode;
import com.saic.csc.service.exception.CSCErrorMsg;
import com.saic.csc.service.exception.UploadModelExcelException;

/**
 * 〈一句话功能简述〉<br> 
 * 〈功能详细描述〉
 *
 * @author 陈琦
 * @see [相关类/方法]（可选）
 * @since [产品/模块版本] （可选）
 */
public class StringDateConverter extends DateConverterBase implements Converter<String, Date> {
    /**
     * 日志
     */
    private static Logger log = LoggerFactory.getLogger(StringDateConverter.class);
    @Override
    public Date convert(String source) {
        if (source == null) {
            return null;
        }

        String trim = source.trim();
        if (trim.length() == 0) {
            return null;
        }

        try {
            return source.contains(":") ? getDateTimeFormat().parse(trim) : getDateFormat().parse(trim);
        } catch (ParseException e) {
            log.error(""+CSCErrorCode.DATE_PARSE_ERROR_CODE,
                    CSCErrorMsg.DATE_FORMAT_ERROR,e);
            throw new UploadModelExcelException(CSCErrorCode.DATE_PARSE_ERROR_CODE,
                    CSCErrorMsg.DATE_FORMAT_ERROR,e);
        }
    }

}

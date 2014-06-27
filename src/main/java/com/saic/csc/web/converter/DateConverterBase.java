/**
 * 
 */
package com.saic.csc.web.converter;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

/**
 * @author Johnny
 * 
 */
public class DateConverterBase {
    /** datePattern */
    private String datePattern = "yyyy-MM-dd";
    /** timePattern */
    private String timePattern = "HH:mm:ss";
    /** dateFormat */
    private DateFormat dateFormat = new SimpleDateFormat(datePattern);
    /** dateTimeFormat */
    private DateFormat dateTimeFormat = new SimpleDateFormat(datePattern + " " + timePattern);

    /**
     * 功能描述: <br>
     * 〈功能详细描述〉
     *
     * @return 日期
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    public DateFormat getDateFormat() {
        return dateFormat;
    }

    /**
     * 功能描述: <br>
     * 〈功能详细描述〉
     *
     * @param dateFormat 格式
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    public void setDateFormat(DateFormat dateFormat) {
        this.dateFormat = dateFormat;
    }

    /**
     * @return the dateTimeFormat
     */
    public DateFormat getDateTimeFormat() {
        return dateTimeFormat;
    }

    /**
     * @param dateTimeFormat the dateTimeFormat to set
     */
    public void setDateTimeFormat(DateFormat dateTimeFormat) {
        this.dateTimeFormat = dateTimeFormat;
    }

}

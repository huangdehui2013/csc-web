/*
 * Copyright (C), 2013-2014, 上海汽车集团股份有限公司
 * FileName: WebUtils.java
 * Author:   于龙
 * Date:     2014年4月23日 下午4:00:04
 * Description: //模块目的、功能描述      
 * History: //修改记录
 * <author>      <time>      <version>    <desc>
 * 修改人姓名             修改时间            版本号                  描述
 */
package com.saic.csc.web.util;

import javax.servlet.http.HttpServletRequest;

/**
 * 〈一句话功能简述〉<br>
 * 〈功能详细描述〉
 * 
 * @author 于龙
 * @see [相关类/方法]（可选）
 * @since [产品/模块版本] （可选）
 */
public class WebUtils {

    private WebUtils() {

    }

    /**
     * 功能描述: <br>
     * 是否ajax请求
     * 
     * @param request request
     * @return 是否ajax请求
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    public static boolean isAjaxRequest(HttpServletRequest request) {
        return request.getHeader("x-requested-with") != null
                && request.getHeader("x-requested-with").equalsIgnoreCase("XMLHttpRequest");
    }
}

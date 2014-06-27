/*
 * Copyright (C), 2013-2014, 上海汽车集团股份有限公司
 * FileName: IndexController.java
 * Author:   于龙
 * Date:     2014年1月10日 上午10:54:35
 * Description: //模块目的、功能描述      
 * History: //修改记录
 * <author>      <time>      <version>    <desc>
 * 修改人姓名             修改时间            版本号                  描述
 */
package com.saic.csc.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 〈一句话功能简述〉<br>
 * 〈功能详细描述〉
 * 
 * @author 于龙
 * @see [相关类/方法]（可选）
 * @since [产品/模块版本] （可选）
 */
@Controller
public class IndexController extends CSCBaseController {
    /**
     * 
     * 功能描述: <br>
     * 〈功能详细描述〉
     *
     * @param model 车型
     * @return string 字符
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @RequestMapping("/index")
    public String list(Model model) {
        return "index.ftl";
    }
}

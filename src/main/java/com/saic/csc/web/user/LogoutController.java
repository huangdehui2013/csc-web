/*
 * Copyright (C), 2013-2014, 上海汽车集团股份有限公司
 * FileName: LogoutController.java
 * Author:   于龙
 * Date:     2014年2月15日 上午11:52:22
 * Description: //模块目的、功能描述      
 * History: //修改记录
 * <author>      <time>      <version>    <desc>
 * 修改人姓名             修改时间            版本号                  描述
 */
package com.saic.csc.web.user;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.saic.csc.web.controller.CSCBaseController;
import com.saic.sso.client.SSOClient;

/**
 * 〈一句话功能简述〉<br>
 * 注销登录
 * 
 * @author 于龙
 * @see [相关类/方法]（可选）
 * @since [产品/模块版本] （可选）
 */
@Controller
public class LogoutController extends CSCBaseController {

    /**
     * 日志
     */
    private static final Logger LOG = LoggerFactory.getLogger(LogoutController.class);

    /**
     * SSO客户端
     */
    @Autowired
    private SSOClient ssoClient;

    /**
     * 功能描述: <br>
     * 注销登录
     * 
     * @throws IOException
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @RequestMapping("/logout")
    public void logout() throws IOException {
        LOG.info("注销登录，域名："+ssoClient.getDomain());
        ssoClient.backLogout(getRequest(), getResponse());
        getResponse().sendRedirect("./");
    }
}

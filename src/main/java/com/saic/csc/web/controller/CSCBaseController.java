/*
 * Copyright (C), 2013-2013, 上海汽车集团股份有限公司
 * FileName: CSCBaseController.java
 * Author:   于龙
 * Date:     2013年12月30日 上午10:14:40
 * Description: //模块目的、功能描述      
 * History: //修改记录
 * <author>      <time>      <version>    <desc>
 * 修改人姓名             修改时间            版本号                  描述
 */
package com.saic.csc.web.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;

import com.ibm.framework.uts.util.StringUtils;
import com.ibm.framework.web.controller.BaseController;
import com.saic.ebiz.cms.exception.ImageIOException;
import com.saic.ebiz.cms.service.api.IImageExtService;
import com.saic.ebiz.cms.service.vo.Image;

import freemarker.ext.beans.BeansWrapper;

/**
 * 〈一句话功能简述〉<br>
 * CSC基类controller
 * 
 * @author 于龙
 * @see [相关类/方法]（可选）
 * @since [产品/模块版本] （可选）
 */
public class CSCBaseController extends BaseController {

    /**
     * 默认用户Id
     */
    public static final long DEFAULT_USER_ID = 44;

    /**
     * 会话的用户id
     */
    public static final String SESSION_USER_ID = "backuserid";

    /**
     * 日志
     */
    private static Logger logger = LoggerFactory.getLogger(CSCBaseController.class);

    /**
     * 请求
     */
    private HttpServletRequest request;

    /**
     * 响应
     */
    private HttpServletResponse response;

    /**
     * 会话
     */
    private HttpSession session;

    /**
     * 图片扩展service
     */
    @Autowired
    private IImageExtService imageExtService;

    /**
     * 功能描述: <br>
     * 设置请求响应值
     * 
     * @param request 请求
     * @param response 响应
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @ModelAttribute
    public void setReqAndRes(HttpServletRequest request, HttpServletResponse response) {
        this.request = request;
        this.response = response;
        this.session = request.getSession();
        // ftl枚举支持
        this.request.setAttribute("enums", BeansWrapper.getDefaultInstance().getEnumModels());
        this.request.setAttribute("statics", BeansWrapper.getDefaultInstance().getStaticModels());
        this.request.setAttribute("requestURI", request.getRequestURI());
    }

    /**
     * 功能描述: <br>
     * 得到session中的用户ID
     * 
     * @return session中的用户ID
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    public String getUserId() {
        String userId = (String) session.getAttribute(SESSION_USER_ID);
        return StringUtils.isEmpty(userId) ? String.valueOf(DEFAULT_USER_ID) : userId;
    }

    /**
     * 功能描述: <br>
     * 发布图片
     * 
     * @param imgId 图片ID
     * @throws ImageIOException 异常
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    public void publishImg(Long imgId) throws ImageIOException {
        if (imgId != null) {
            List<Long> imgs = new ArrayList<Long>();
            imgs.add(imgId);
            try {
                imageExtService.publishImgs(imgs);
            } catch (ImageIOException e) {
                logger.error("发布图片异常：" + e);
            }
        }
    }

    /**
     * 功能描述: <br>
     * 得到图片Url
     * 
     * @param imgId 图片ID
     * @return 图片URL
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    public String getImageUrl(Long imgId) {
        List<Long> imgIds = new ArrayList<Long>();
        imgIds.add(imgId);
        List<Image> imageList = imageExtService.findImgs(imgIds);
        if (imageList != null && imageList.size() > 0) {
            return imageList.get(0).getPath();
        }
        return null;
    }

    /**
     * @return the request
     */
    public HttpServletRequest getRequest() {
        return request;
    }

    /**
     * @return the response
     */
    public HttpServletResponse getResponse() {
        return response;
    }

    /**
     * @return the session
     */
    public HttpSession getSession() {
        return session;
    }

}

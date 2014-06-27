/*
 * Copyright (C), 2013-2013, 上海汽车集团股份有限公司
 * FileName: SpreadControllerTest.java
 * Author:   于龙
 * Date:     2013年12月5日 下午2:59:17
 * Description: //模块目的、功能描述      
 * History: //修改记录
 * <author>      <time>      <version>    <desc>
 * 修改人姓名             修改时间            版本号                  描述
 */
package com.saic.csc.test;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.web.servlet.HandlerExecutionChain;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;
import org.testng.Assert;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

import com.ibm.framework.web.controller.BaseController;
import com.saic.csc.constants.CSCConstants;

/**
 * 〈一句话功能简述〉<br>
 * 〈功能详细描述〉
 * 
 * @author 于龙
 * @see [相关类/方法]（可选）
 * @since [产品/模块版本] （可选）
 */
public class SpreadControllerTest extends BaseTest {
    /**
     */
    private static final String TOP_FOCUS = "topFocus";

    /**
     */
    private static final String NODE_VALUE = "nodeValue";

    /**
     */
    private static final int NAV_NUMS = 10;
    
    private static final String NAV_BRAND_ID = "2";
    
    private static final String TER_ID = "2";

    private MockHttpServletRequest request;

    private MockHttpServletResponse response;

    @Autowired
    private RequestMappingHandlerAdapter handlerAdapter;

    @Autowired
    private RequestMappingHandlerMapping handlerMapping;

    @BeforeTest
    public void before() {
        request = new MockHttpServletRequest();
        request.setCharacterEncoding("UTF-8");
        response = new MockHttpServletResponse();
    }

    /**
     * 功能描述: <br>
     * 测试Nav页面
     * 
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @Test
    public void testNav() throws Exception {
        request.setRequestURI("/spread/nav");
        HandlerExecutionChain chain = handlerMapping.getHandler(request);
        ModelAndView mav = handlerAdapter.handle(request, response, chain.getHandler());
        Assert.assertNotNull(mav.getModelMap().get("velSeriesNavList"));
        Assert.assertEquals("spread/nav.ftl", mav.getViewName());
    }

    /**
     * 功能描述: <br>
     * 保存Nav
     * 
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @Test
    public void testSaveNav() throws Exception {
        request.setRequestURI("/spread/saveNav");
        for (int i = 0; i < NAV_NUMS; i++) {
            request.addParameter("navIndexs", String.valueOf(i + 1));
            request.addParameter("navIds", String.valueOf(i + 2));
            request.addParameter("navBrandIds", NAV_BRAND_ID);
            request.addParameter("navSeriesIds", "11");
        }
        HandlerExecutionChain chain = handlerMapping.getHandler(request);
        ModelAndView mav = handlerAdapter.handle(request, response, chain.getHandler());
        Assert.assertEquals("redirect:nav.htm", mav.getViewName());
    }

    /**
     * 功能描述: <br>
     * 快速购物车页面
     * 
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @Test
    public void testFastBuy() throws Exception {
        request.setRequestURI("/spread/fastBuy");
        HandlerExecutionChain chain = handlerMapping.getHandler(request);
        ModelAndView mav = handlerAdapter.handle(request, response, chain.getHandler());
        Assert.assertEquals("spread/fastBuy.ftl", mav.getViewName());
    }

    /**
     * 功能描述: <br>
     * 测试保存快速购物车
     * 
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @Test
    public void testSaveFastBuy() throws Exception {
        request.setRequestURI("/spread/saveFastBuy");
        request.addParameter("navId", "1");
        request.addParameter("navBrandId", NAV_BRAND_ID);
        request.addParameter("navSeriesId", "26");
        HandlerExecutionChain chain = handlerMapping.getHandler(request);
        ModelAndView mav = handlerAdapter.handle(request, response, chain.getHandler());
        Assert.assertEquals("redirect:fastBuy.htm", mav.getViewName());
    }

    /**
     * 功能描述: <br>
     * 测试图片相关页面
     * 
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @Test
    public void testNode() throws Exception {
        request.setRequestURI("/spread/node/topFocus");
        request.setParameter("territoryId", TER_ID);
        HandlerExecutionChain chain = handlerMapping.getHandler(request);
        ModelAndView mav = handlerAdapter.handle(request, response, chain.getHandler());
        Assert.assertNotNull(mav.getModel().get("allList"));
        Assert.assertEquals("spread/node.ftl", mav.getViewName());
    }

    /**
     * 功能描述: <br>
     * 测试新增图片
     * 
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @Test
    public void testAdd() throws Exception {
        request.setRequestURI("/spread/add");
        request.setParameter("nodeIndex", "5");
        request.setParameter("terId", TER_ID);
        request.setParameter(NODE_VALUE, TOP_FOCUS);
        HandlerExecutionChain chain = handlerMapping.getHandler(request);
        ModelAndView mav = handlerAdapter.handle(request, response, chain.getHandler());
        Assert.assertNotNull(mav);
        Assert.assertEquals(mav.getModelMap().get(NODE_VALUE), TOP_FOCUS);
        Assert.assertEquals("spread/nodeAdd.ftl", mav.getViewName());
    }

    /**
     * 功能描述: <br>
     * 测试编辑图片
     * 
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @Test
    public void testEdit() throws Exception {
        request.setRequestURI("/spread/edit");
        request.setParameter("nodeIndex", "5");
        request.setParameter("terId", TER_ID);
        request.setParameter(NODE_VALUE, TOP_FOCUS);
        request.setParameter("blockNodeId", "6");
        HandlerExecutionChain chain = handlerMapping.getHandler(request);
        ModelAndView mav = handlerAdapter.handle(request, response, chain.getHandler());
        Assert.assertNotNull(mav);
        Assert.assertEquals(mav.getModelMap().get(NODE_VALUE), TOP_FOCUS);
        Assert.assertEquals("spread/nodeEdit.ftl", mav.getViewName());
    }

    /**
     * 功能描述: <br>
     * 测试保存图片
     * 
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @SuppressWarnings("unchecked")
    @Test
    public void testSave() throws Exception {
        request.setRequestURI("/spread/save");
        request.addParameter("terId", TER_ID);
        request.addParameter("imgId", "1");
        request.setParameter(NODE_VALUE, TOP_FOCUS);
        request.addParameter("nodeImgLink", "http://www.baidu.com");
        request.addParameter("nodeTitle", "标题");
        request.addParameter("nodeLink", "http://www.google.com");
        request.addParameter("nodeIndex", "5");
        HandlerExecutionChain chain;
        chain = handlerMapping.getHandler(request);
        ModelAndView mav = handlerAdapter.handle(request, response, chain.getHandler());
        Map<String, Object> map = (Map<String, Object>) mav.getModel().get("ret");
        Assert.assertEquals(map.get(BaseController.STATUS), CSCConstants.TRUE);
    }
}

/*
 * Copyright (C), 2013-2013, 上海汽车集团股份有限公司
 * FileName: DealerControllerTest.java
 * Author:   刘海斌
 * Date:     2013年12月6日 下午1:44:34
 * Description: //模块目的、功能描述      
 * History: //修改记录
 * <author>      <time>      <version>    <desc>
 * 修改人姓名             修改时间            版本号                  描述
 */
package com.saic.csc.test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.web.servlet.HandlerExecutionChain;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;
import org.testng.Assert;
import org.testng.AssertJUnit;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

import com.ibm.framework.web.controller.BaseController;

/**
 * 〈一句话功能简述〉<br>
 * 〈功能详细描述〉
 * 
 * @author 刘海斌
 * @see [相关类/方法]（可选）
 * @since [产品/模块版本] （可选）
 */
public class DealerControllerTest extends BaseTest {
    /**
     */
    private static final String NUM_ONE = "1";

    /**
     */
    private static final String STORE_ID = "storeId";

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
     * 
     * 功能描述: 经销商店铺列表页面显示 〈功能详细描述〉
     * 
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @Test
    public void show() throws Exception {
        request.setRequestURI("/dealer/show");
        HandlerExecutionChain chain;

        chain = handlerMapping.getHandler(request);
        ModelAndView mav = handlerAdapter.handle(request, response, chain.getHandler());
        AssertJUnit.assertNotNull(mav);
        AssertJUnit.assertEquals("/dealer/list.ftl", mav.getViewName());

    }

    /**
     * 
     * 功能描述: 店铺列表 带分页及查询条件
     * 
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @Test
    public void list() throws Exception {
        request.setRequestURI("/dealer/list.json");
        request.setParameter("storeName", "测试店铺");

        request.setParameter("sEcho", NUM_ONE);
        request.setParameter("iDisplayStart", "0");
        request.setParameter("iDisplayLength", "5");
        HandlerExecutionChain chain;

        chain = handlerMapping.getHandler(request);
        handlerAdapter.handle(request, response, chain.getHandler());
        Assert.assertNotNull(response.getContentAsString());
    }

    /**
     * 
     * 功能描述: 显示店铺修改页 〈功能详细描述〉
     * 
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @Test
    public void showUpdate() throws Exception {
        request.setRequestURI("/dealer/showUpdate");
        request.setParameter(STORE_ID, NUM_ONE);

        HandlerExecutionChain chain = handlerMapping.getHandler(request);
        ModelAndView mav = handlerAdapter.handle(request, response, chain.getHandler());
        AssertJUnit.assertNotNull(mav);
        AssertJUnit.assertEquals("/dealer/update.ftl", mav.getViewName());
    }

    /**
     * 
     * 功能描述: 店铺信息修改 〈功能详细描述〉
     * 
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @Test
    public void update() throws Exception {
        request.setRequestURI("/dealer/update.json");
        request.setParameter("storeName", "测试店铺Rename");
        request.setParameter("dealerId", NUM_ONE);
        request.setParameter("dealerName", "经销商1");
        request.setParameter(STORE_ID, NUM_ONE);

        HandlerExecutionChain chain;

        chain = handlerMapping.getHandler(request);
        ModelAndView mav = handlerAdapter.handle(request, response, chain.getHandler());
        Assert.assertNotNull(mav.getModelMap().get(BaseController.MESSAGE));
    }

    /**
     * 
     * 功能描述:店铺下线 〈功能详细描述〉
     * 
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @Test
    public void updateStat() throws Exception {
        request.setRequestURI("/dealer/updateStat.json");
        request.setParameter(STORE_ID, NUM_ONE);

        HandlerExecutionChain chain;

        chain = handlerMapping.getHandler(request);
        handlerAdapter.handle(request, response, chain.getHandler());
        Assert.assertNotNull(response.getContentAsString());
    }

    /**
     * 
     * 功能描述: <br>
     * 〈功能详细描述〉
     * 
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    public void fileUpload() {

    }

    /**
     * 
     * 功能描述:获取店铺简介内容
     * 
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @Test
    public void getStoreDesc() throws Exception {
        request.setRequestURI("/dealer/getStoreDesc");
        request.setParameter(STORE_ID, NUM_ONE);

        HandlerExecutionChain chain = handlerMapping.getHandler(request);
        ModelAndView mav = handlerAdapter.handle(request, response, chain.getHandler());
        AssertJUnit.assertNotNull(mav);
        Assert.assertNotNull(mav.getModelMap().get("desc"));
        AssertJUnit.assertEquals("/dealer/storeDesc.ftl", mav.getViewName());

    }

    /**
     * 功能描述:获取经销商销售顾问
     * 
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @Test
    public void getSellManList() throws Exception {
        request.setRequestURI("/dealer/getSellManList");
        request.setParameter(STORE_ID, NUM_ONE);
        request.setParameter("pageNo", NUM_ONE);
        request.setParameter("pageSize", "8");

        HandlerExecutionChain chain = handlerMapping.getHandler(request);
        ModelAndView mav = handlerAdapter.handle(request, response, chain.getHandler());
        AssertJUnit.assertNotNull(mav);
        Assert.assertNotNull(mav.getModelMap().get("pageNo"));
        Assert.assertNotNull(mav.getModelMap().get("pageSize"));
        AssertJUnit.assertEquals("/dealer/sellManList.ftl", mav.getViewName());

    }

    /**
     * 
     * 功能描述: 店铺图片显示 带分页
     * 
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @Test
    public void showStoreImgs() throws Exception {
        request.setRequestURI("/dealer/showStoreImgs");
        request.setParameter(STORE_ID, NUM_ONE);
        request.setParameter("pageNo", NUM_ONE);
        request.setParameter("pageSize", "8");

        HandlerExecutionChain chain = handlerMapping.getHandler(request);
        ModelAndView mav = handlerAdapter.handle(request, response, chain.getHandler());
        AssertJUnit.assertNotNull(mav);
        Assert.assertNotNull(mav.getModelMap().get("pageNo"));
        Assert.assertNotNull(mav.getModelMap().get("pageSize"));
        Assert.assertNotNull(mav.getModelMap().get("pageCount"));

        AssertJUnit.assertEquals("/dealer/storeImages.ftl", mav.getViewName());
    }

}

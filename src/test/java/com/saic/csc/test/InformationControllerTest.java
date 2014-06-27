/*
 * Copyright (C), 2013-2013, 上海汽车集团股份有限公司
 * FileName: InformationControllerTest.java
 * Author:   于龙
 * Date:     2013年12月5日 上午10:31:20
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
import com.saic.ebiz.csc.service.constants.RowStatus;

/**
 * 〈一句话功能简述〉<br>
 * 〈功能详细描述〉
 * 
 * @author 于龙
 * @see [相关类/方法]（可选）
 * @since [产品/模块版本] （可选）
 */
public class InformationControllerTest extends BaseTest {

    /**
     */
    private static final String ARTICLE_ID = "articleId";

    /**
     */
    private static final String TEST_ARTICLE_ID = "83";

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
     * 测试列表
     * 
     * @throws Exception
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @Test
    public void testList() throws Exception {
        request.setRequestURI("/info/list");
        HandlerExecutionChain chain = handlerMapping.getHandler(request);
        ModelAndView mav = handlerAdapter.handle(request, response, chain.getHandler());
        Assert.assertNotNull(mav.getModelMap().get("brandList"));
        Assert.assertNotNull(mav.getModelMap().get("cateList"));
        Assert.assertEquals("info/infoList.ftl", mav.getViewName());

    }

    /**
     * 功能描述: <br>
     * 测试列表ajax
     * 
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @Test
    public void testInfoAjaxList() throws Exception {
        request.setRequestURI("/info/infoAjaxList.json");
        request.setParameter("sEcho", "1");
        request.setParameter("iDisplayStart", "0");
        request.setParameter("iDisplayLength", "5");
        HandlerExecutionChain chain = handlerMapping.getHandler(request);
        handlerAdapter.handle(request, response, chain.getHandler());
        Assert.assertNotNull(response.getContentAsString());

    }

    /**
     * 功能描述: <br>
     * 测试新增
     * 
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @Test
    public void testAdd() throws Exception {
        request.setRequestURI("/info/add");
        HandlerExecutionChain chain = handlerMapping.getHandler(request);
        ModelAndView mav = handlerAdapter.handle(request, response, chain.getHandler());
        Assert.assertNotNull(mav);
        Assert.assertEquals("info/infoAdd.ftl", mav.getViewName());
    }

    /**
     * 功能描述: <br>
     * 测试检查是否可编辑
     * 
     * @throws Exception
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @SuppressWarnings("unchecked")
    @Test
    public void testCheckEdit() throws Exception {
        request.setRequestURI("/info/checkEdit");
        request.addParameter(ARTICLE_ID, TEST_ARTICLE_ID);
        HandlerExecutionChain chain = handlerMapping.getHandler(request);
        ModelAndView mav = handlerAdapter.handle(request, response, chain.getHandler());
        Map<String, Object> map = (Map<String, Object>) mav.getModel().get("checkEdit");
        Assert.assertEquals(map.get(BaseController.STATUS), CSCConstants.TRUE);
        Assert.assertNotNull(mav);
        Assert.assertNull(mav.getViewName());
    }

    /**
     * 功能描述: <br>
     * 测试编辑页面
     * 
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @Test
    public void testEdit() throws Exception {
        request.setRequestURI("/info/edit");
        request.addParameter(ARTICLE_ID, TEST_ARTICLE_ID);
        HandlerExecutionChain chain = handlerMapping.getHandler(request);
        ModelAndView mav = handlerAdapter.handle(request, response, chain.getHandler());
        Assert.assertNotNull(mav.getModelMap().get("articleVo"));
        Assert.assertEquals("info/infoEdit.ftl", mav.getViewName());
    }

    /**
     * 功能描述: <br>
     * 测试保存
     * 
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @Test
    public void testSave() throws Exception {
        request.setRequestURI("/info/save");
        request.addParameter("cover", "10");
        request.addParameter("articleCategoryId", "2");
        request.addParameter("articleName", "文章名称");
        request.addParameter("subTitle", "副标题");
        request.addParameter("keywords", "关键字1,关键字2");
        request.addParameter("materialSource", "素材来源");
        request.addParameter("editer", "编辑");
        request.addParameter("relateBrands", "1");
        request.addParameter("relateBrands", "2");
        request.addParameter("relateSeriess", "3");
        request.addParameter("relateSeriess", "4");
        request.addParameter("cmsTitles", "正文标题1");
        request.addParameter("cmsTitles", "正文标题2");
        request.addParameter("zxglfwb", "正文1");
        request.addParameter("zxglfwb", "正文2");
        HandlerExecutionChain chain;
        chain = handlerMapping.getHandler(request);
        ModelAndView mav = handlerAdapter.handle(request, response, chain.getHandler());
        Assert.assertNotNull(mav);
        Assert.assertEquals("redirect:list.htm", mav.getViewName());
    }

    /**
     * 功能描述: <br>
     * 检测是否可以被审核
     * 
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @SuppressWarnings("unchecked")
    @Test
    public void testCheckVerify() throws Exception {
        request.setRequestURI("/info/checkVerify");
        request.addParameter(ARTICLE_ID, TEST_ARTICLE_ID);
        HandlerExecutionChain chain = handlerMapping.getHandler(request);
        ModelAndView mav = handlerAdapter.handle(request, response, chain.getHandler());
        Map<String, Object> map = (Map<String, Object>) mav.getModel().get("checkVerify");
        Assert.assertEquals(map.get(BaseController.STATUS), CSCConstants.TRUE);
        Assert.assertNotNull(mav);
        Assert.assertNull(mav.getViewName());
    }

    /**
     * 功能描述: <br>
     * 测试去审核的页面
     * 
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @Test
    public void testToVerify() throws Exception {
        request.setRequestURI("/info/toVerify");
        request.addParameter(ARTICLE_ID, TEST_ARTICLE_ID);
        HandlerExecutionChain chain = handlerMapping.getHandler(request);
        ModelAndView mav = handlerAdapter.handle(request, response, chain.getHandler());
        Assert.assertNotNull(mav.getModelMap().get(ARTICLE_ID));
        Assert.assertEquals("info/infoVerify.ftl", mav.getViewName());
    }

    /**
     * 功能描述: <br>
     * 测试审核
     * 
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @SuppressWarnings("unchecked")
    @Test
    public void testVerify() throws Exception {
        request.setRequestURI("/info/verify");
        request.addParameter("rowStatus", RowStatus.APPROVE.getValue());
        request.addParameter("memo", "通过审核");
        request.addParameter(ARTICLE_ID, TEST_ARTICLE_ID);
        HandlerExecutionChain chain = handlerMapping.getHandler(request);
        ModelAndView mav = handlerAdapter.handle(request, response, chain.getHandler());
        Map<String, Object> map = (Map<String, Object>) mav.getModel().get("verifyRet");
        Assert.assertEquals(map.get(BaseController.STATUS), CSCConstants.TRUE);
        Assert.assertNotNull(mav);
        Assert.assertNull(mav.getViewName());
    }

    /**
     * 功能描述: <br>
     * 测试检查能否下线
     * 
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @SuppressWarnings("unchecked")
    @Test
    public void testCheckRemove() throws Exception {
        request.setRequestURI("/info/checkRemove");
        request.addParameter(ARTICLE_ID, TEST_ARTICLE_ID);
        HandlerExecutionChain chain = handlerMapping.getHandler(request);
        ModelAndView mav = handlerAdapter.handle(request, response, chain.getHandler());
        Map<String, Object> map = (Map<String, Object>) mav.getModel().get("checkRemove");
        Assert.assertEquals(map.get(BaseController.STATUS), CSCConstants.TRUE);
        Assert.assertNotNull(mav);
        Assert.assertNull(mav.getViewName());
    }

    /**
     * 功能描述: <br>
     * 测试下线
     * 
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @SuppressWarnings("unchecked")
    @Test
    public void testRemove() throws Exception {
        request.setRequestURI("/info/remove");
        request.addParameter(ARTICLE_ID, TEST_ARTICLE_ID);
        HandlerExecutionChain chain = handlerMapping.getHandler(request);
        ModelAndView mav = handlerAdapter.handle(request, response, chain.getHandler());
        Map<String, Object> map = (Map<String, Object>) mav.getModel().get("removeRet");
        Assert.assertEquals(map.get(BaseController.STATUS), CSCConstants.FALSE);
        Assert.assertNotNull(mav);
        Assert.assertNull(mav.getViewName());
    }
}

package com.saic.csc.test;

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

/**
 * 
 * @author v_zhaowenbin01
 * 
 */
public class UserControllerTest extends BaseTest {
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
        request.setRequestURI("/user/list");
        HandlerExecutionChain chain = handlerMapping.getHandler(request);
        ModelAndView mav = handlerAdapter.handle(request, response, chain.getHandler());
        Assert.assertEquals("user/list.ftl", mav.getViewName());
    }

    /**
     * 功能描述: <br>
     * 测试列表ajax
     * 
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @Test
    public void testUserAjaxList() throws Exception {
        request.setRequestURI("/user/userAjaxList.json");
        request.setParameter("sEcho", "1");
        request.setParameter("iDisplayStart", "0");
        request.setParameter("iDisplayLength", "5");
        request.setParameter("selectTypies", "0");
        request.setParameter("selectStatuses", "1");
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
    public void testAccess() throws Exception {
        request.setRequestURI("/user/access.json");
        HandlerExecutionChain chain = handlerMapping.getHandler(request);
        ModelAndView mav = handlerAdapter.handle(request, response, chain.getHandler());
        Assert.assertNotNull(mav);
        Assert.assertEquals("user/access.json", mav.getViewName());
    }


    /**
     * 功能描述: <br>
     * 测试编辑页面
     * 
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @Test
    public void testDrop() throws Exception {
        request.setRequestURI("/user/drop.json");
        request.addParameter(ARTICLE_ID, TEST_ARTICLE_ID);
        HandlerExecutionChain chain = handlerMapping.getHandler(request);
        ModelAndView mav = handlerAdapter.handle(request, response, chain.getHandler());
        Assert.assertNotNull(mav.getModelMap().get("auditVo"));
        Assert.assertEquals("user/drop.json", mav.getViewName());
    }

  
}

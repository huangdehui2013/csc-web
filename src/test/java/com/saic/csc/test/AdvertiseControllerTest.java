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


/**
 * 〈一句话功能简述〉<br>
 * 广告的controller的Test
 * 
 * @author yulong
 * @see [相关类/方法]（可选）
 * @since [产品/模块版本] （可选）
 */
public class AdvertiseControllerTest extends BaseTest {

    /**
     */
    private static final String ADV_ID = "advId";

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
        request.setRequestURI("/adv/list");
        HandlerExecutionChain chain = handlerMapping.getHandler(request);
        ModelAndView mav = handlerAdapter.handle(request, response, chain.getHandler());
        Assert.assertNotNull(mav);
        Assert.assertEquals("adv/advList.ftl", mav.getViewName());
    }

    /**
     * 功能描述: <br>
     * 测试列表ajax
     * 
     * @throws Exception
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @Test
    public void testAdvAjaxList() throws Exception {
        request.setRequestURI("/adv/advAjaxList");
        request.setParameter("sEcho", "1");
        request.setParameter("iDisplayStart", "0");
        request.setParameter("iDisplayLength", "5");
        HandlerExecutionChain chain = handlerMapping.getHandler(request);
        ModelAndView mav = handlerAdapter.handle(request, response, chain.getHandler());
        Assert.assertNull(mav);

    }

    /**
     * 功能描述: <br>
     * 测试新增
     * 
     * @throws Exception
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @Test
    public void testAdd() throws Exception {
        request.setRequestURI("/adv/add");
        HandlerExecutionChain chain = handlerMapping.getHandler(request);
        ModelAndView mav = handlerAdapter.handle(request, response, chain.getHandler());
        Assert.assertNotNull(mav);
        Assert.assertEquals("adv/advAdd.ftl", mav.getViewName());
    }

    /**
     * 功能描述: <br>
     * 测试保存
     * 
     * @throws Exception
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @Test
    public void testSave() throws Exception {
        request.setRequestURI("/adv/save");
        request.addParameter("territoryId", "2");
        request.addParameter("blockName", "广告位名称test1");
        request.addParameter("imgId", "1");
        request.addParameter("nodeTitle", "广告标题2222");
        request.addParameter("nodeImgLink", "http://www.baidu.com/");
        request.addParameter("nodeLink", "http://www.google.com/");

        request.addParameter("blockId", "185");
        request.addParameter("nodeId", "27");
        HandlerExecutionChain chain;
        chain = handlerMapping.getHandler(request);
        ModelAndView mav = handlerAdapter.handle(request, response, chain.getHandler());
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
        request.setRequestURI("/adv/edit");
        request.addParameter(ADV_ID, "185");
        request.addParameter(ADV_ID, "27");
        HandlerExecutionChain chain = handlerMapping.getHandler(request);
        ModelAndView mav = handlerAdapter.handle(request, response, chain.getHandler());
        Assert.assertNotNull(mav);
        Assert.assertEquals("adv/advEdit.ftl", mav.getViewName());
    }

    /**
     * 功能描述: <br>
     * 测试上架动作
     * 
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @SuppressWarnings("unchecked")
    @Test
    public void testOnshelf() throws Exception {
        request.setRequestURI("/adv/onshelf");
        request.addParameter(ADV_ID, "185");
        request.addParameter(ADV_ID, "27");
        request.addParameter(ADV_ID, "26");
        HandlerExecutionChain chain = handlerMapping.getHandler(request);
        ModelAndView mav = handlerAdapter.handle(request, response, chain.getHandler());
        Map<String, Object> map = (Map<String, Object>) mav.getModel().get("onshelf");
        Assert.assertEquals(map.get("status"), "false");
        Assert.assertEquals(map.get("message"), "非待上线和已下线状态不能上线操作");
        Assert.assertNotNull(mav);
        Assert.assertNull(mav.getViewName());
    }

    @SuppressWarnings("unchecked")
    @Test
    public void testOffshelf() throws Exception {
        request.setRequestURI("/adv/offshelf");
        request.addParameter(ADV_ID, "185");
        request.addParameter(ADV_ID, "27");
        request.addParameter(ADV_ID, "26");
        HandlerExecutionChain chain = handlerMapping.getHandler(request);
        ModelAndView mav = handlerAdapter.handle(request, response, chain.getHandler());
        Map<String, Object> map = (Map<String, Object>) mav.getModel().get("offshelf");
        Assert.assertEquals(map.get("status"), "false");
        Assert.assertEquals(map.get("message"), "非上线状态不能下线操作");
        Assert.assertNotNull(mav);
        Assert.assertNull(mav.getViewName());
    }
}

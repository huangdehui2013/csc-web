/*
 * Copyright (C), 2013-2013, 上海汽车集团股份有限公司
 * FileName: VelModelControllerTest.java
 * Author:   刘海斌
 * Date:     2013年12月5日 下午4:41:38
 * Description: //模块目的、功能描述      
 * History: //修改记录
 * <author>      <time>      <version>    <desc>
 * 修改人姓名             修改时间            版本号                  描述
 */
package com.saic.csc.test;

import java.io.FileInputStream;

import org.testng.annotations.Test;
import org.testng.AssertJUnit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.mock.web.MockMultipartHttpServletRequest;
import org.springframework.web.servlet.HandlerExecutionChain;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;
import org.testng.annotations.BeforeTest;
import org.testng.Assert;

import com.ibm.framework.web.controller.BaseController;

/**
 * velModelController测试case 〈功能详细描述〉
 * 
 * @author 刘海斌
 * @see [相关类/方法]（可选）
 * @since [产品/模块版本] （可选）
 */
public class VelModelControllerTest extends BaseTest {

    /**
     */
    private static final String NUM_ONE = "1";

    /**
     */
    private static final String PAGE_SIZE = "pageSize";

    /**
     */
    private static final String PAGE_NO = "pageNo";

    /**
     */
    private static final String VEL_MODEL_ID = "velModelId";

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
     * 功能描述:车型列表show 测试
     * 
     * @throws Exception
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @Test
    public void testShow() throws Exception {
        request.setRequestURI("/velModel/show");
        HandlerExecutionChain chain;

        chain = handlerMapping.getHandler(request);
        ModelAndView mav = handlerAdapter.handle(request, response, chain.getHandler());
        AssertJUnit.assertNotNull(mav);
        AssertJUnit.assertEquals("/velModel/list.ftl", mav.getViewName());

    }

    /**
     * 
     * 功能描述:根据品牌查车系 json
     * 
     * @throws Exception
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @Test
    public void testFindProductClassByBrand() throws Exception {
        request.setRequestURI("/velModel/getClassByBrandId.json");
        request.setParameter("productBrandId", NUM_ONE);
        HandlerExecutionChain chain;

        chain = handlerMapping.getHandler(request);
        handlerAdapter.handle(request, response, chain.getHandler());
        Assert.assertNotNull(response.getContentAsString());
    }

    /**
     * 
     * 功能描述: 根据车系查车型 json
     * 
     * @throws Exception
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @Test
    public void testFindProductByClassId() throws Exception {
        request.setRequestURI("/velModel/getProductByClassId.json");
        request.setParameter("productClassId", NUM_ONE);
        HandlerExecutionChain chain;

        chain = handlerMapping.getHandler(request);
        ModelAndView mav = handlerAdapter.handle(request, response, chain.getHandler());
        Assert.assertNotNull(mav.getModelMap().get("Products"));
    }

    /**
     * 
     * 功能描述: 根据条件，列表页查询 json
     * 
     * @throws Exception
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @Test
    public void testList() throws Exception {
        request.setRequestURI("/velModel/list.json");

        request.setParameter("velBrandId", "3");
        request.setParameter("velSeriesId", "");
        request.setParameter(VEL_MODEL_ID, "");
        request.setParameter("velModelStatus", "3");
        request.setParameter("productionStatus", NUM_ONE);

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
     * 功能描述:车型状态修改 〈功能详细描述〉
     * 
     * @throws Exception
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    public void testUpdateStatus() throws Exception {
        request.setRequestURI("/velModel/updateStatus.json");
        request.setParameter(VEL_MODEL_ID, NUM_ONE);
        request.setParameter("status", "3");
        HandlerExecutionChain chain = handlerMapping.getHandler(request);
        handlerAdapter.handle(request, response, chain.getHandler());
        Assert.assertNotNull(response.getContentAsString());

    }

    /**
     * 
     * 功能描述: 显示 车型基本信息，专业参数
     * 
     * 
     * @throws Exception
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @Test
    public void testShowVelModelById() throws Exception {
        request.setRequestURI("/velModel/shouUpdate");
        request.setParameter(VEL_MODEL_ID, NUM_ONE);

        HandlerExecutionChain chain;

        chain = handlerMapping.getHandler(request);
        ModelAndView mav = handlerAdapter.handle(request, response, chain.getHandler());
        Assert.assertNotNull(mav);
        Assert.assertNotNull(mav.getModelMap().get("velModel"));
        Assert.assertNotNull(mav.getModelMap().get("details"));
        Assert.assertEquals("/velModel/update.ftl", mav.getViewName());

    }

    /**
     * 
     * 功能描述: 修改车型
     * 
     * @throws Exception
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @Test
    public void testUpdate() throws Exception {
        request.setRequestURI("/velModel/update.json");
        request.setAttribute(VEL_MODEL_ID, NUM_ONE);
        request.setAttribute("velModelName", "车型name1");
        // 其他属性设置
        HandlerExecutionChain chain;

        chain = handlerMapping.getHandler(request);
        ModelAndView mav = handlerAdapter.handle(request, response, chain.getHandler());
        Assert.assertNotNull(mav);
        Assert.assertNull(mav.getViewName());

    }

    /**
     * 
     * 功能描述: 新增文件上传 json
     * @throws Exception 
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */

    public void testFileUpload() throws Exception {
        request.setRequestURI("/velModel/fileUpload.json"); // 文件参数怎么传 //

        MockMultipartHttpServletRequest request = new MockMultipartHttpServletRequest();
        String filepath = "D:/workspace/csc-web/src/test/resources/conf/spring/spring-servlet-test.xml";
        final FileInputStream fis = new FileInputStream(filepath);
        MockMultipartFile multipartFile = new MockMultipartFile(filepath, "spring-servlet-test.xml", "text/xml", fis);
        request.addFile(multipartFile);
        request.setMethod("POST");
        request.setContentType("multipart/form-data");
        request.addHeader("Content-type", "multipart/form-data");
        request.setContent(multipartFile.getBytes());
        HandlerExecutionChain chain = handlerMapping.getHandler(request);
        ModelAndView mav = handlerAdapter.handle(request, new MockHttpServletResponse(), chain.getHandler());
        fis.close();
        Assert.assertNull(mav);
        Assert.assertNotNull(response.getContentAsString());
    }

    /**
     * 
     * 功能描述:显示车型图片 〈功能详细描述〉
     * @throws Exception 
     * 
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @Test
    public void testShowImages() throws Exception {
        String pageNo = NUM_ONE;
        String pageSize = "8";

        request.setRequestURI("/velModel/showImages");
        request.setParameter(VEL_MODEL_ID, NUM_ONE);
        request.setParameter("status", NUM_ONE);
        request.setParameter("categroyId", NUM_ONE);
        request.setParameter(PAGE_NO, pageNo);
        request.setParameter(PAGE_SIZE, pageSize);

        HandlerExecutionChain chain = handlerMapping.getHandler(request);
        ModelAndView mav = handlerAdapter.handle(request, response, chain.getHandler());

        Assert.assertNotNull(mav.getModelMap().get("categroyId"));
        Assert.assertNotNull(mav.getModelMap().get(BaseController.STATUS));
        Assert.assertNotNull(mav.getModelMap().get(VEL_MODEL_ID));
        Assert.assertEquals(mav.getModelMap().get(PAGE_NO), Integer.parseInt(pageNo));
        Assert.assertEquals(mav.getModelMap().get(PAGE_SIZE), Integer.parseInt(pageSize));
        Assert.assertNotNull(mav.getModelMap().get("pageCount"));
        Assert.assertNotNull(mav.getModelMap().get("countPage"));

        Assert.assertEquals("/velModel/imageManage.ftl", mav.getViewName());

    }

    /**
     * 
     * 功能描述:显示车系所有颜色条
     * @throws Exception 
     * 
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @Test
    public void testShowColors() throws Exception {
        String pageNo = NUM_ONE;
        String pageSize = "4";
        String categroyId = "7";

        request.setRequestURI("/velModel/showColors");

        request.setParameter(VEL_MODEL_ID, NUM_ONE);
        request.setParameter("categroyId", categroyId);
        request.setParameter(PAGE_NO, pageNo);
        request.setParameter(PAGE_SIZE, pageSize);

        HandlerExecutionChain chain;

        chain = handlerMapping.getHandler(request);
        ModelAndView mav = handlerAdapter.handle(request, response, chain.getHandler());
        Assert.assertEquals(mav.getModelMap().get("categroyId"), categroyId);
        Assert.assertNotNull(mav.getModelMap().get(VEL_MODEL_ID));

        Assert.assertEquals(mav.getModelMap().get(PAGE_NO), Integer.parseInt(pageNo));
        Assert.assertEquals(mav.getModelMap().get(PAGE_SIZE), Integer.parseInt(pageSize));

        Assert.assertEquals("/velModel/imageManage.ftl", mav.getViewName());

    }

    /**
     * 
     * 功能描述: 保存车型颜色条
     * @throws Exception 
     * 
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @Test
    public void testSaveVelModelColor() throws Exception {
        request.setRequestURI("/velModel/saveVelModelColor");
        request.setParameter(VEL_MODEL_ID, NUM_ONE);
        request.setParameter("modelImgIds", "1,2,5");

        HandlerExecutionChain chain = handlerMapping.getHandler(request);
        ModelAndView mav = handlerAdapter.handle(request, response, chain.getHandler());
        Assert.assertNotNull(mav);
        Assert.assertEquals("forward:showColors.htm", mav.getViewName());

    }

    /**
     * 
     * 功能描述: 保存图片顺序调整
     * @throws Exception 
     * 
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @Test
    public void testChangeImageSort() throws Exception {
        request.setRequestURI("/velModel/changeImageSort");
        request.setParameter("imageId", NUM_ONE);
        request.setParameter("imageId", "2");
        request.setParameter("imageId", "3");
        request.setParameter("imageId", "4");

        request.setParameter(PAGE_SIZE, "8");
        request.setParameter(PAGE_NO, NUM_ONE);

        HandlerExecutionChain chain = handlerMapping.getHandler(request);
        ModelAndView mav = handlerAdapter.handle(request, response, chain.getHandler());
        Assert.assertNotNull(mav);
        Assert.assertEquals("forward:showImages.htm", mav.getViewName());

    }

    /**
     * 功能描述:改变图片状态，发布，删除等
     * 
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @Test
    public void testChangeImageStauts() throws Exception {
        request.setRequestURI("/velModel/changeImageStauts");
        request.setParameter("modelImgIds", "1,2,3");
        // 删除
        request.setParameter("actionStatus", "D");

        HandlerExecutionChain chain = handlerMapping.getHandler(request);
        ModelAndView mav = handlerAdapter.handle(request, response, chain.getHandler());
        Assert.assertNotNull(mav);
        Assert.assertEquals("forward:showImages.htm", mav.getViewName());

    }

    /**
     * 
     * 功能描述: 查询车型详情 cms使用
     * 
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @Test
    public void testFindVelModelById() throws Exception {
        request.setRequestURI("/velModel/findVelModelById.json");
        request.setParameter(VEL_MODEL_ID, NUM_ONE);

        HandlerExecutionChain chain = handlerMapping.getHandler(request);
        ModelAndView mav = handlerAdapter.handle(request, response, chain.getHandler());
        Assert.assertNull(mav);
        Assert.assertNotNull(response.getContentAsString());
    }

    /**
     * 
     * 功能描述: 查询车系所有颜色json cms使用
     * 
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @Test
    public void testFindVelColorBySeries() throws Exception {
        request.setRequestURI("/velModel/findVelColorBySeries.json");
        request.setParameter("seriesId", NUM_ONE);

        HandlerExecutionChain chain = handlerMapping.getHandler(request);
        ModelAndView mav = handlerAdapter.handle(request, response, chain.getHandler());
        Assert.assertNull(mav);
        Assert.assertNotNull(response.getContentAsString());
    }

    /**
     * 
     * 功能描述:查询某车系的所有车系年款 json cms调用
     * 
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @Test
    public void testFindVelYearStyleByVelSeries() throws Exception {
        request.setRequestURI("/velModel/findVelYearStyleByVelSeries.json");
        request.setParameter("seriesId", NUM_ONE);

        HandlerExecutionChain chain = handlerMapping.getHandler(request);
        ModelAndView mav = handlerAdapter.handle(request, response, chain.getHandler());
        Assert.assertNull(mav);
        Assert.assertNotNull(response.getContentAsString());
    }

    /**
     * 
     * 功能描述:查询所有车型品牌 cms用
     * 
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @Test
    public void testFindVelBrandAll() throws Exception {
        request.setRequestURI("/velModel/findVelBrandAll.json");

        HandlerExecutionChain chain = handlerMapping.getHandler(request);
        ModelAndView mav = handlerAdapter.handle(request, response, chain.getHandler());
        Assert.assertNull(mav);
        Assert.assertNotNull(response.getContentAsString());
    }

}

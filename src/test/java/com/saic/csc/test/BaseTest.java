package com.saic.csc.test;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.testng.AbstractTestNGSpringContextTests;

/**
 * 〈一句话功能简述〉<br>
 * 单元测试基类
 * 
 * @author 于龙
 * @see [相关类/方法]（可选）
 * @since [产品/模块版本] （可选）
 */
@ContextConfiguration(locations = { "classpath:conf/spring/spring-servlet-test.xml" })
public abstract class BaseTest extends AbstractTestNGSpringContextTests {

}

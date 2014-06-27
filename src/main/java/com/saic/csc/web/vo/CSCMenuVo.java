/*
 * Copyright (C), 2013-2013, 上海汽车集团股份有限公司
 * FileName: CSCMenuVo.java
 * Author:   于龙
 * Date:     2013年12月30日 下午5:50:18
 * Description: //模块目的、功能描述      
 * History: //修改记录
 * <author>      <time>      <version>    <desc>
 * 修改人姓名             修改时间            版本号                  描述
 */
package com.saic.csc.web.vo;

import java.io.Serializable;
import java.util.List;

import com.saic.ebiz.am.service.entity.MenuVo;


/**
 * 〈一句话功能简述〉<br> 
 * csc菜单
 *
 * @author 于龙
 * @see [相关类/方法]（可选）
 * @since [产品/模块版本] （可选）
 */
public class CSCMenuVo implements Serializable{
    
    /**
     */
    private static final long serialVersionUID = 7492429269795013448L;

    /**
     * 菜单
     */
    private MenuVo menuVo;
    
    /**
     * 是否有子节点
     */
    private boolean hasChild;
    
    /**
     * 子节点列表
     */
    private List<CSCMenuVo> childList;

    public MenuVo getMenuVo() {
        return menuVo;
    }

    public void setMenuVo(MenuVo menuVo) {
        this.menuVo = menuVo;
    }

    public boolean isHasChild() {
        return hasChild;
    }

    public void setHasChild(boolean hasChild) {
        this.hasChild = hasChild;
    }

    public List<CSCMenuVo> getChildList() {
        return childList;
    }

    public void setChildList(List<CSCMenuVo> childList) {
        this.childList = childList;
    }
    
}

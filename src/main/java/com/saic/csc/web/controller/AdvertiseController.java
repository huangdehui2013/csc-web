package com.saic.csc.web.controller;

import java.util.Date;
import java.util.List;

import javax.validation.Valid;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ibm.framework.dal.pagination.PaginationResult;
import com.meidusa.toolkit.common.util.StringUtil;
import com.saic.csc.bean.CSCQueryBean;
import com.saic.csc.constants.CSCConstants;
import com.saic.csc.service.IAdvertService;
import com.saic.csc.service.IBlockService;
import com.saic.csc.service.ITerritoryService;
import com.saic.csc.service.exception.AdvertMultipleException;
import com.saic.csc.service.vo.AjaxDataTableVO;
import com.saic.csc.util.DateUtil;
import com.saic.csc.web.vo.RetMsg;
import com.saic.ebiz.cms.exception.ImageIOException;
import com.saic.ebiz.csc.service.constants.BlockNodeStatus;
import com.saic.ebiz.csc.service.entity.Block;
import com.saic.ebiz.csc.service.entity.BlockNode;
import com.saic.ebiz.csc.service.entity.Node;
import com.saic.ebiz.csc.service.entity.Territory;
import com.saic.ebiz.csc.service.vo.AdvertVO;

/**
 * 广告管理功能<br>
 * 包括广告的列表 新增 预览 上线 更新 下线
 * 
 * @author 于龙
 * @see [相关类/方法]（可选）
 * @since [产品/模块版本] （可选）
 */
@Controller
@RequestMapping("/adv")
public class AdvertiseController extends CSCBaseController {

    /**
     * TER_LIST
     */
    private static final String TER_LIST = "terList";

    /**
     * 日志
     */
    private static Logger logger = LoggerFactory.getLogger(AdvertiseController.class);

    /**
     * 区块service
     */
    @Autowired
    private IBlockService blockService;

    /**
     * 城市站 service
     */
    @Autowired
    private ITerritoryService territoryService;

    /**
     * 广告服务
     */
    @Autowired
    private IAdvertService advertService;

    /**
     * 功能描述: <br>
     * 广告列表
     * 
     * @param model 模型
     * @return 广告列表页面
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @RequestMapping("/list")
    public String list(Model model) {
        List<Territory> territoryList = territoryService.findTerritoryBaseList();
        model.addAttribute(TER_LIST, territoryList);
        List<Block> blockList = advertService.findBlockAll();
        model.addAttribute("blockList", blockList);
        return "adv/advList.ftl";
    }

    /**
     * 功能描述: <br>
     * 广告列表ajax
     * 
     * @param dataTable 表格参数
     * @param advert 广告查询条件
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @RequestMapping("advAjaxList")
    @ResponseBody
    public AjaxDataTableVO<AdvertVO> advAjaxList(CSCQueryBean dataTable, AdvertVO advert) {
        String startTime = getRequest().getParameter("startTime");
        String endTime = getRequest().getParameter("endTime");
        logger.info("advAjaxList---startTime---" + startTime);
        logger.info("advAjaxList---endTime---" + endTime);
        Date queryStartTime = null;
        Date queryEndTime = null;
        if (!StringUtils.isEmpty(startTime)) {
            startTime = startTime + ":00";
            queryStartTime = DateUtil.parseDateTimeForFull(startTime);
        }
        if (!StringUtils.isEmpty(endTime)) {
            endTime = endTime + ":00";
            queryEndTime = DateUtil.parseDateTimeForFull(endTime);
        }
        PaginationResult<List<AdvertVO>> result = advertService.findAdvertPage(dataTable.getPagination(), advert,
                queryStartTime, queryEndTime);
        return new AjaxDataTableVO<AdvertVO>(dataTable.getsEcho(), result);
    }

    /**
     * 功能描述: <br>
     * 新增页面
     * 
     * @param model 模型
     * @return 新增页面
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @RequestMapping("/add")
    public String add(Model model) {
        List<Territory> terList = territoryService.findTerritoryBaseList();
        model.addAttribute(TER_LIST, terList);
        List<Block> blockList = advertService.findBlockAll();
        model.addAttribute("blockList", blockList);
        return "adv/advAdd.ftl";
    }

    /**
     * 功能描述: <br>
     * 保存广告
     * 
     * @param advert 广告对象
     * @param bindingResult 验证信息
     * @param model 模型
     * @return 保存结果的json
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @RequestMapping("/save")
    @ResponseBody
    public RetMsg save(@Valid AdvertVO advert, BindingResult bindingResult, Model model) {
        logger.info("save---advert---" + advert);
        RetMsg retMsg = null;
        if (bindingResult.hasErrors()) {
            StringBuilder errorMsg = new StringBuilder();
            List<ObjectError> erros = bindingResult.getAllErrors();
            for (ObjectError objectError : erros) {
                errorMsg.append(objectError.getDefaultMessage()).append("<br>");
            }
            retMsg = RetMsg.createRetMsg(CSCConstants.FALSE, errorMsg.toString());
        } else {
            if (advert.getNodeId() == null) {
                try {
                    advertService.saveAdvert(advert, getUserId());
                } catch (AdvertMultipleException e) {
                    logger.error("save---advert---" + advert + ",---exception" + e);
                    retMsg = RetMsg.createRetMsg(CSCConstants.FALSE, "该广告位广告内容已经存在");
                    return retMsg;
                }
            } else {
                advertService.updateAdvert(advert, getUserId());
            }
            // 发布图片
            try {
                publishImg(advert.getImgId());
            } catch (ImageIOException e) {
                logger.error("save---advert---" + advert + ",imgId---" + advert.getImgId() + ",exception---" + e);
            }
            retMsg = RetMsg.createRetMsg(CSCConstants.TRUE, "保存成功");
        }
        return retMsg;
    }

    /**
     * 功能描述: <br>
     * 编辑页面
     * 
     * @param advId 广告ID集合，逗号分割(blockId,nodeId,blockNodeId)
     * @param model 模型
     * @return 编辑页面
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @RequestMapping("/edit")
    public String edit(String advId, Model model) {
        logger.info("edit---advId---" + advId);
        List<Territory> terList = territoryService.findTerritoryBaseList();
        model.addAttribute(TER_LIST, terList);
        if (!StringUtil.isEmpty(advId)) {
            String[] ids = advId.split(CSCConstants.COMMA);
            logger.info("edit---ids.length" + ids.length);
            if (null != ids && ids.length > 0) {
                Block block = blockService.findById(Integer.parseInt(ids[0]));
                model.addAttribute("block", block);
                Node node = advertService.findNodeById(Long.parseLong(ids[1]));
                if (null != node) {
                    Long imgId = node.getImgId();
                    if (null != imgId) {
                        model.addAttribute("imageUrl", getImageUrl(imgId));
                    }
                    Long territoryId = node.getTerritoryId();
                    if (null != territoryId) {
                        model.addAttribute("territory", territoryService.load(territoryId));
                    }
                    model.addAttribute("node", node);
                }
                model.addAttribute("blockNodeId", ids[2]);
            }
        }
        return "adv/advEdit.ftl";
    }

    /**
     * 功能描述: <br>
     * 预览页面
     * 
     * @param advId 广告ID集合，逗号分割(blockId,nodeId,blockNodeId)
     * @param model 模型
     * @return 预览页面
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @RequestMapping("/preview")
    public String preview(String advId, Model model) {
        logger.info("preview---advId---" + advId);
        List<Territory> terList = territoryService.findTerritoryBaseList();
        model.addAttribute(TER_LIST, terList);
        if (!StringUtil.isEmpty(advId)) {
            String[] ids = advId.split(CSCConstants.COMMA);
            logger.info("edit---ids.length" + ids.length);
            if (null != ids && ids.length > 0) {
                Block block = blockService.findById(Integer.parseInt(ids[0]));
                logger.info("preview---block---" + block);
                model.addAttribute("block", block);
                Node node = advertService.findNodeById(Long.parseLong(ids[1]));
                logger.info("preview---node---" + node);
                if (null != node) {
                    Long imgId = node.getImgId();
                    logger.info("preview---imgId---" + imgId);
                    if (null != imgId) {
                        model.addAttribute("imageUrl", getImageUrl(imgId));
                    }
                    Long territoryId = node.getTerritoryId();
                    logger.info("preview---territoryId---" + territoryId);
                    if (null != territoryId) {
                        model.addAttribute("territory", territoryService.load(territoryId));
                    }
                    model.addAttribute("node", node);
                }
                model.addAttribute("blockNodeId", ids[2]);
            }
        }
        return "adv/advPreview.ftl";
    }

    /**
     * 功能描述: <br>
     * 上线
     * 
     * @param advId 广告ID集合，逗号分割(blockId,nodeId,blockNodeId)
     * @param model 模型
     * @return 上线结果的json
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @RequestMapping("/onshelf")
    @ResponseBody
    public RetMsg onshelf(String advId, Model model) {
        logger.info("onshelf---advId---" + advId);
        RetMsg retMsg = null;
        if (!StringUtil.isEmpty(advId)) {
            String[] ids = advId.split(",");
            logger.info("edit---ids.length" + ids.length);
            if (null != ids && ids.length > 0) {
                BlockNode blockNode = advertService.findBlockNodeById(Long.parseLong(ids[2]));
                if (null != blockNode) {
                    if (BlockNodeStatus.PRELINE.getValue() == blockNode.getBlockNodeStatus()
                            || BlockNodeStatus.OFFLINE.getValue() == blockNode.getBlockNodeStatus()) {
                        Long blockNodeId = blockNode.getBlockNodeId();
                        logger.info("onshelf---blockNodeId---" + blockNodeId);
                        if (null != blockNodeId) {
                            advertService.onshelfAdvert(blockNodeId, getUserId());
                            retMsg = RetMsg.createRetMsg(CSCConstants.TRUE, "上线成功");
                        } else {
                            retMsg = RetMsg.createRetMsg(CSCConstants.FALSE, "没有该广告");
                        }
                    } else {
                        retMsg = RetMsg.createRetMsg(CSCConstants.FALSE, "非待上线和已下线状态不能上线操作");
                    }
                }
            }
        }
        return retMsg;
    }

    /**
     * 功能描述: <br>
     * 下线
     * 
     * @param advId 广告ID集合，逗号分割(blockId,nodeId,blockNodeId)
     * @param model 模型
     * @return 下线结果的json
     * @see [相关类/方法](可选)
     * @since [产品/模块版本](可选)
     */
    @RequestMapping("/offshelf")
    @ResponseBody
    public RetMsg offshelf(String advId, Model model) {
        RetMsg retMsg = null;
        BlockNode blockNode = advertService.findBlockNodeById(Long.parseLong(advId.split(",")[2]));
        if (BlockNodeStatus.ONLINE.getValue() == blockNode.getBlockNodeStatus()) {
            advertService.offshelfAdvert(blockNode.getBlockNodeId(), getUserId());
            retMsg = RetMsg.createRetMsg(CSCConstants.TRUE, "下线成功 ");
        } else {
            retMsg = RetMsg.createRetMsg(CSCConstants.FALSE, "非上线状态不能下线操作 ");
        }
        return retMsg;
    }
}

/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : ticket

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2018-05-27 23:31:15
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `check`
-- ----------------------------
DROP TABLE IF EXISTS `check`;
CREATE TABLE `check` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `checkTicketId` int(11) DEFAULT NULL COMMENT '验证发票id',
  `checkUserId` int(255) DEFAULT NULL COMMENT '验证人Id',
  `checkTime` date DEFAULT NULL COMMENT '验证时间',
  `checkResult` varchar(255) DEFAULT NULL COMMENT '验证结果1为通过.0为验证过,-1为数据出错',
  `checkReason` varchar(255) DEFAULT NULL,
  `checkUser` varchar(255) DEFAULT NULL COMMENT '检验人',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of check
-- ----------------------------
INSERT INTO `check` VALUES ('1', '22', '1', '2017-06-02', '1', '通过', 'admin');
INSERT INTO `check` VALUES ('2', '23', '1', '2017-06-03', '1', '通过', 'admin');
INSERT INTO `check` VALUES ('3', '22', '1', '2017-06-03', '0', '验证过', 'admin');
INSERT INTO `check` VALUES ('4', '23', '1', '2017-06-29', '-1', '数据出错', 'admin');
INSERT INTO `check` VALUES ('5', '26', '1', '2017-06-14', '-1', '数据出错', 'admin');
INSERT INTO `check` VALUES ('6', '26', '1', '2017-06-14', '-1', '数据出错', 'admin');
INSERT INTO `check` VALUES ('7', '26', '1', '2017-06-14', '-1', '数据出错', null);
INSERT INTO `check` VALUES ('8', '26', '1', '2017-06-14', '-1', '数据出错', null);
INSERT INTO `check` VALUES ('9', '26', '1', '2017-06-14', '-1', '数据出错', null);
INSERT INTO `check` VALUES ('10', '26', '1', '2017-06-14', '-1', '数据出错', null);
INSERT INTO `check` VALUES ('11', '26', '1', '2017-06-14', '-1', '数据出错', null);
INSERT INTO `check` VALUES ('12', '26', '1', '2017-06-14', '-1', '数据出错', null);
INSERT INTO `check` VALUES ('13', '26', '1', '2017-06-14', '-1', '数据出错', null);
INSERT INTO `check` VALUES ('14', '26', '1', '2017-06-14', '-1', '数据出错', null);
INSERT INTO `check` VALUES ('15', '26', '1', '2017-06-14', '-1', '数据出错', null);
INSERT INTO `check` VALUES ('16', '26', '1', '2017-06-14', '-1', '数据出错', null);
INSERT INTO `check` VALUES ('17', '26', '1', '2017-06-14', '-1', '数据出错', null);
INSERT INTO `check` VALUES ('18', '26', '1', '2017-06-14', '-1', '数据出错', null);
INSERT INTO `check` VALUES ('19', '26', '1', '2017-06-14', '-1', '数据出错', null);
INSERT INTO `check` VALUES ('20', '26', '1', '2017-06-14', '-1', '数据出错', null);
INSERT INTO `check` VALUES ('21', '26', '1', '2017-06-14', '-1', '数据出错', null);
INSERT INTO `check` VALUES ('22', '26', '1', '2017-06-14', '-1', '数据出错', null);
INSERT INTO `check` VALUES ('23', '26', '1', '2017-06-15', '-1', '数据出错', 'admin');
INSERT INTO `check` VALUES ('24', '26', '1', '2017-06-15', '-1', '数据出错', 'admin');
INSERT INTO `check` VALUES ('25', '26', '1', '2017-06-15', '-1', '数据出错', 'admin');
INSERT INTO `check` VALUES ('26', '26', '1', '2017-06-15', '-1', '数据出错', 'admin');
INSERT INTO `check` VALUES ('27', '26', '1', '2017-06-15', '-1', '数据出错', 'admin');
INSERT INTO `check` VALUES ('28', '31', '1', '2017-06-15', '-1', '数据出错', 'admin');
INSERT INTO `check` VALUES ('29', '32', '1', '2017-06-15', '1', '数据一致', 'admin');
INSERT INTO `check` VALUES ('30', '33', '1', '2017-06-15', '1', '数据一致', 'admin');
INSERT INTO `check` VALUES ('31', '34', '1', '2017-06-15', '1', '数据一致', 'admin');
INSERT INTO `check` VALUES ('32', '26', '1', '2017-06-15', '-1', '数据出错', 'admin');
INSERT INTO `check` VALUES ('33', '26', '1', '2017-06-15', '-1', '数据出错', 'admin');
INSERT INTO `check` VALUES ('34', '26', '1', '2017-06-15', '-1', '数据出错', 'admin');
INSERT INTO `check` VALUES ('35', '26', '1', '2017-06-15', '-1', '数据出错', 'admin');
INSERT INTO `check` VALUES ('36', '26', '1', '2017-06-15', '-1', '数据出错', 'admin');
INSERT INTO `check` VALUES ('37', '26', '1', '2017-06-15', '-1', '数据出错', 'admin');
INSERT INTO `check` VALUES ('38', '26', '1', '2017-06-15', '-1', '数据出错', 'admin');
INSERT INTO `check` VALUES ('39', '36', '1', '2017-06-15', '1', '数据一致', 'admin');
INSERT INTO `check` VALUES ('40', '38', '1', '2017-06-15', '1', '数据一致', 'admin');
INSERT INTO `check` VALUES ('41', '26', '1', '2017-06-15', '-1', '数据出错', 'admin');
INSERT INTO `check` VALUES ('42', '26', '1', '2017-06-15', '-1', '数据出错', 'admin');
INSERT INTO `check` VALUES ('43', '26', '1', '2017-06-15', '-1', '数据出错', 'admin');
INSERT INTO `check` VALUES ('44', '26', '1', '2017-06-15', '-1', '数据出错', 'admin');
INSERT INTO `check` VALUES ('45', '26', '3', '2017-06-15', '-1', '数据出错', 'a');
INSERT INTO `check` VALUES ('46', '39', '3', '2017-06-15', '1', '数据一致', 'a');
INSERT INTO `check` VALUES ('47', '40', '1', '2017-06-17', '1', '数据一致', 'admin');
INSERT INTO `check` VALUES ('48', '26', '1', '2017-06-17', '-1', '数据出错', 'admin');
INSERT INTO `check` VALUES ('49', '37', '1', '2017-06-17', '1', '数据一致', 'admin');
INSERT INTO `check` VALUES ('50', '41', '1', '2017-06-17', '1', '数据一致', 'admin');
INSERT INTO `check` VALUES ('51', '42', '1', '2017-06-17', '1', '数据一致', 'admin');

-- ----------------------------
-- Table structure for `permission`
-- ----------------------------
DROP TABLE IF EXISTS `permission`;
CREATE TABLE `permission` (
  `id` int(11) NOT NULL,
  `pname` varchar(11) DEFAULT NULL COMMENT '权限名称',
  `description` varchar(255) DEFAULT NULL COMMENT '描述',
  `path` varchar(255) DEFAULT NULL COMMENT '路径',
  `memu` varchar(255) DEFAULT NULL COMMENT '是否生成菜单',
  `plevel` int(11) DEFAULT NULL COMMENT '优先级',
  `parentId` int(11) DEFAULT NULL COMMENT '父权限编号',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of permission
-- ----------------------------
INSERT INTO `permission` VALUES ('1', '系统管理', '系统管理(顶级)', null, null, '100', '0');
INSERT INTO `permission` VALUES ('2', '基础管理', '基础管理(顶级)', null, null, '200', '0');
INSERT INTO `permission` VALUES ('11', '读权限', '读权限(1级)', null, null, '101', '1');
INSERT INTO `permission` VALUES ('12', '写权限', '写权限(1级)', null, null, '102', '1');
INSERT INTO `permission` VALUES ('21', '基础权限', '基础权限(1级)', null, null, '201', '2');

-- ----------------------------
-- Table structure for `role`
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rname` varchar(255) DEFAULT '角色名称',
  `description` varchar(255) DEFAULT NULL COMMENT '角色描述',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('1', '管理员', '测试1');

-- ----------------------------
-- Table structure for `role_permission`
-- ----------------------------
DROP TABLE IF EXISTS `role_permission`;
CREATE TABLE `role_permission` (
  `roleId` int(11) NOT NULL,
  `permissionId` int(11) NOT NULL,
  PRIMARY KEY (`permissionId`,`roleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role_permission
-- ----------------------------
INSERT INTO `role_permission` VALUES ('1', '1');
INSERT INTO `role_permission` VALUES ('1', '2');

-- ----------------------------
-- Table structure for `ticket`
-- ----------------------------
DROP TABLE IF EXISTS `ticket`;
CREATE TABLE `ticket` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tcode` varchar(255) DEFAULT NULL COMMENT '发票代码',
  `tnumber` varchar(20) DEFAULT NULL COMMENT '发票号码',
  `tmoney` varchar(255) DEFAULT NULL COMMENT '税前金额',
  `tdate` varchar(11) DEFAULT NULL COMMENT '开票日期',
  `tcheckcode` varchar(255) DEFAULT NULL COMMENT '校验码',
  `tchecked` int(5) DEFAULT NULL COMMENT '验证并通过为1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ticket
-- ----------------------------
INSERT INTO `ticket` VALUES ('22', '1200153321', '07041661', '183.49', '20150000', '83623873463907646331', '0');
INSERT INTO `ticket` VALUES ('23', '234', '234', '234', '20150120', '110110110110110', '0');
INSERT INTO `ticket` VALUES ('24', '345', '345', '345', '20150220', '1101100110101010', '0');
INSERT INTO `ticket` VALUES ('25', '345', '25432', '2312', '20160220', '22020202', '0');
INSERT INTO `ticket` VALUES ('26', '3', '1', '2', '9', '57', '0');
INSERT INTO `ticket` VALUES ('27', '2', '3', '1', '57', '9', '0');
INSERT INTO `ticket` VALUES ('30', '1200153320', '07041662', '183.49', '20151221', '83623873463907646339', '0');
INSERT INTO `ticket` VALUES ('31', '7', '12', '34', '8', '56', '0');
INSERT INTO `ticket` VALUES ('32', '', '22', '', '', '', '1');
INSERT INTO `ticket` VALUES ('33', '', '869', '', '', '', '1');
INSERT INTO `ticket` VALUES ('34', '', '96', '', '', '', '1');
INSERT INTO `ticket` VALUES ('35', '', '889', '', '', '', '0');
INSERT INTO `ticket` VALUES ('36', '', '2', '5', '', '', '1');
INSERT INTO `ticket` VALUES ('37', '', '25', '2', '', '', '1');
INSERT INTO `ticket` VALUES ('38', '', '5', '2', '', '', '1');
INSERT INTO `ticket` VALUES ('39', '', '10', '2', '', '', '1');
INSERT INTO `ticket` VALUES ('40', '', '555', '55', '', '', '1');
INSERT INTO `ticket` VALUES ('41', '', '348', '6738', '', '', '1');
INSERT INTO `ticket` VALUES ('42', '', '34648376', '34918', '', '', '1');

-- ----------------------------
-- Table structure for `unit`
-- ----------------------------
DROP TABLE IF EXISTS `unit`;
CREATE TABLE `unit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uname` varchar(255) DEFAULT '单位名称' COMMENT '某单位',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of unit
-- ----------------------------
INSERT INTO `unit` VALUES ('1', '管理员单位');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `unitId` int(11) DEFAULT NULL COMMENT '单位id',
  `truename` varchar(255) DEFAULT NULL COMMENT '用户名',
  `password` varchar(255) DEFAULT NULL COMMENT '密码',
  `loginname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '1', 'admin', '123456', 'admin');
INSERT INTO `user` VALUES ('2', '1', '张三', '123456', '张三');
INSERT INTO `user` VALUES ('3', '1', 'a', '1', 'a');

-- ----------------------------
-- Table structure for `user_role`
-- ----------------------------
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
  `userId` int(11) NOT NULL COMMENT '用户编号',
  `roleId` int(11) NOT NULL COMMENT '角色编号',
  PRIMARY KEY (`userId`,`roleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_role
-- ----------------------------
INSERT INTO `user_role` VALUES ('1', '1');

package com.kk.apollo.biz;

import com.kk.apollo.biz.dao.ticket.TicketMapper;
import com.kk.apollo.biz.model.ticket.Ticket;
import com.kk.apollo.biz.model.user.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractJUnit4SpringContextTests;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath*:config/spring/local/spring-mybatis.xml"})
public class TestClass extends AbstractJUnit4SpringContextTests{

    //注入测试类
    @Autowired
    private TicketMapper ticketMapper;

//    @Resource(name = "TicketMapper")
//    public void setUserDao(TicketMapper ticketMapper) {
//        this.userDao = userDao;
//    }

    @Test
    public void testDoInsert() throws Exception {




    }
}
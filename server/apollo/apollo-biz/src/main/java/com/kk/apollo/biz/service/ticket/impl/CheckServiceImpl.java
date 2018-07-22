package com.kk.apollo.biz.service.ticket.impl;

import com.kk.apollo.biz.dao.ticket.CheckMapper;
import com.kk.apollo.biz.model.ticket.Check;
import com.kk.apollo.biz.service.ticket.CheckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by Administrator on 2017/6/6.
 */
@Service
public class CheckServiceImpl implements CheckService {
    @Autowired
    CheckMapper checkMapper;
    @Override
    public void insertCheck(Check check) {
        checkMapper.insert(check);
    }
}

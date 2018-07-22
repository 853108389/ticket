package com.kk.apollo.controller;

import com.kk.apollo.biz.model.ticket.Check;
import com.kk.apollo.biz.model.ticket.Ticket;
import com.kk.apollo.biz.model.ticket.TicketCheck;
import com.kk.apollo.biz.model.ticket.TicketSum;
import com.kk.apollo.biz.model.user.User;
import com.kk.apollo.biz.service.ticket.CheckService;
import com.kk.apollo.biz.service.ticket.TicketService;
import com.kk.apollo.biz.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/15.
 */
@Controller
@RequestMapping("/ticket")
public class TicketController {

    @Autowired
    TicketService ticketService;
    @Autowired
    CheckService checkService;
    @Autowired
    UserService userService;


    /**
     * TODO 单边查询
     * fetch
     * 查询当前年份的所有发票
     *
     * @return
     */
    @RequestMapping("fetchByYears")
    public @ResponseBody
    List<TicketCheck> ticketChecks(@RequestBody Map<String, String> map) {
        String startYear = "";
        String endYear = "";
        String userId = "";
        List<TicketCheck> ticketChecks = new ArrayList<>();
        if (map.containsKey("userId")) {
            userId = map.get("userId");
        }
        if (map.containsKey("startYear")) {
            startYear = map.get("startYear");
        }
        if (map.containsKey("endYear")) {
            endYear = map.get("endYear");
        }
        if (startYear.equals("") || endYear.equals("") || userId == null || userId == "") {
        } else {
            ticketChecks = ticketService.findByYears(startYear, endYear, Integer.parseInt(userId));
            ticketChecks = this.rtTicketChecks(ticketChecks);
        }
        return ticketChecks;
    }

    /**
     * fetch
     * 添加一张发票
     *
     * @return
     */
    @RequestMapping("fetchInsert")
    public @ResponseBody
    String fetchInsert(@RequestBody Map<String, String> map) {
        String userId = "";
        String tnumber = "";
        String tmoney = "";
        String tcode = "";
        String tcheckcode = "";
        String tdate = "";
        //没加时间正则和表单验证
        if (map.containsKey("userId")) {
            userId = map.get("userId");
        }
        if (map.containsKey("tnumber")) {
            tnumber = map.get("tnumber");
        }
        if (map.containsKey("tmoney")) {
            tmoney = map.get("tmoney");
        }
        if (map.containsKey("tcode")) {
            tcode = map.get("tcode");
        }
        if (map.containsKey("tcheckcode")) {
            tcheckcode = map.get("tcheckcode");
        }
        if (map.containsKey("tdate")) {
            tdate = map.get("tdate");
        }
        System.out.println(userId);
        System.out.println(tmoney);
        System.out.println(tcode);
        System.out.println(tdate);
        if (tmoney == "" || tcode == "" || tdate == "") {
            //需要重新输入
        }
        String check = this.check(userId, tnumber, tcode, tdate, tmoney, tcheckcode);//进行发票校验
        return check;
    }

    /**
     * fetch
     * 汇总某一年的发票
     *
     * @return
     */
    @RequestMapping("fetchSumByYear")
    public @ResponseBody
    TicketSum fetchSumByYear(@RequestBody Map<String, String> map) {
        TicketSum ticketSum = null;
        String year = "";
        String userId = "";
        if (map.containsKey("year")) {
            year = map.get("year");
        }
        if (map.containsKey("userId")) {
            userId = map.get("userId");
        }

        if (year.equals("")) {
            //TODO 要改
            ticketSum = new TicketSum();
            ticketSum.setPassperc("无");
            ticketSum.setYear("无");
            ticketSum.setSumMoney("无");
        }

        ticketSum = ticketService.findSumByYear(year, userId);
        if (ticketSum != null) {
            ticketSum.setYear(year);
            int pass = Integer.parseInt(ticketSum.getPass());
            int nopass = Integer.parseInt(ticketSum.getNopass());
            Double passperc = 1.00 * pass / (nopass + pass);
            String result = String.format("%.2f", passperc);
            ticketSum.setPassperc(result);
        } else {
            ticketSum = new TicketSum();
//            ticketSum.setPassperc("无");
//            ticketSum.setPass("无");
            ticketSum.setYear(year);
            ticketSum.setSumMoney("无");
//            ticketSum.setNopass("无");
        }

        return ticketSum;
    }

    /**
     * 查询通过发票
     *
     * @return
     */
    @RequestMapping("fetchPassDetail")
    public @ResponseBody
    List<TicketCheck> fetchPassDetail(@RequestBody Map<String, String> map) {
        String userId = "";
        if (map.containsKey("userId")) {
            userId = map.get("userId");
        }
        List<TicketCheck> ticketChecks = new ArrayList<>();
        ticketChecks = ticketService.fetchPassDetail(Integer.parseInt(userId));
        ticketChecks = this.rtTicketChecks(ticketChecks);

        return ticketChecks;
    }

    /**
     * 查询不通过发票
     *
     * @return
     */
    @RequestMapping("fetchNoPassDetail")
    public @ResponseBody
    List<TicketCheck> fetchNoPassDetail(@RequestBody Map<String, String> map) {
        String userId = "";
        String checkResult = "";
        List<TicketCheck> ticketChecks = new ArrayList<>();
        if (map.containsKey("userId")) {
            userId = map.get("userId");
        }
        if (map.containsKey("checkResult")) {
            checkResult = map.get("checkResult");
        }
        ticketChecks = ticketService.fetchNoPassDetail(Integer.parseInt(userId));
        ticketChecks = rtTicketChecks(ticketChecks);
        return ticketChecks;
    }

    @RequestMapping("findSumByYear")
    public String findSumByYear(HttpServletRequest request, Model model) {
        String year = request.getParameter("year");
        String userId = request.getParameter("userId");

        TicketSum ticketSum = ticketService.findSumByYear(year, userId);
        if (ticketSum != null) {
//            ticketSum.setYear(year);
//            int pass = Integer.parseInt(ticketSum.getPass());
//            int nopass = Integer.parseInt(ticketSum.getNopass());
//            Double passperc = 1.00 * pass / (nopass + pass);
//            ticketSum.setPassperc(passperc.toString());
        }
        model.addAttribute("ticketSum", ticketSum);
        return "count";
    }

    @RequestMapping("findByYears")
    public String findByYears(HttpServletRequest request, Model model) {
        String startYear = request.getParameter("startYear");
        String endYear = request.getParameter("endYear");
        String userId = request.getParameter("userId");
        List<TicketCheck> tickets = ticketService.findByYears(startYear, endYear, Integer.parseInt(userId));
        model.addAttribute("tickets", tickets);
        return "search";
    }

    /**
     * 手工录入
     *
     * @param request
     * @return
     */
    @RequestMapping("insert")
    public String insert(HttpServletRequest request) {
        //没加时间正则和表单验证
        String userId = request.getParameter("userId");
        String tnumber = request.getParameter("tnumber");
        String tmoney = request.getParameter("tmoney");
        String tcode = request.getParameter("tcode");
        String tdate = request.getParameter("tdate");
        String tcheckcode = request.getParameter("tcheckcode");
        System.out.println(tnumber);
        System.out.println(tmoney);
        System.out.println(tcode);
        System.out.println(tdate);
        if (tmoney == "" || tcode == "" || tdate == "") {
            //需要重新输入
            return "redirect:index";
        }
        String check = this.check(userId, tnumber, tcode, tdate, tmoney, tcheckcode);//进行发票校验
        return "redirect:index";
    }

    @RequestMapping("toCount")
    public String toCount() {
        return "count";
    }

    @RequestMapping("toQdvideo")
    public String toQdvideo() {
        return "qdvideo";
    }

    @RequestMapping("toSearch")
    public String toSearch() {
        return "search";
    }

    @RequestMapping("toTable")
    public String toTable() {
        return "table";
    }

    @RequestMapping("toIndex")
    public String toIndex(Model model) {
//        int pass = ticketService.findPass();
//        int nopass = ticketService.findnoPass();
//        model.addAttribute("pass", pass);
//        model.addAttribute("nopass", nopass);
        return "index";
    }


    /**
     * 进行发票的校验
     * // flag  -1为第一次 1为通过  0为未通过  00为已验证过 01为数据错误
     * //  setCheckresult   验证结果1为通过.0为验证过,-1为数据出错
     * //TODO 未增加判断是否为发票的二维码
     *
     * @param tnumber
     * @param tcode
     * @param tdate
     * @param tmoney
     * @return
     */
    public String check(String userId, String tnumber, String tcode, String tdate, String tmoney, String tcheckcode) {
        Check check = new Check();
        String flag = "-1";//-1为第一次 1为通过  0为未通过  00为已验证过 01为数据错误
        Ticket findTicket = ticketService.findTicketByTnumber(tnumber);
        User user = userService.fetchUserByUserId(Integer.parseInt(userId));
        if (findTicket != null) {
            check.setCheckticketid(findTicket.getId());
            check.setChecktime(new Date(System.currentTimeMillis()));
            check.setCheckuserid(Integer.parseInt(userId));
            check.setCheckuser(user.getLoginname());
            if (findTicket.getTchecked().equals("1")) {
                //已经被验证过一次了
                check.setCheckresult("0");
                check.setCheckreason("验证过");
                flag = "00";
            } else {
                //发票不是第一次录入,并且没有被验证过
                if (findTicket.getTcode().equals(tcode) && findTicket.getTdate().equals(tdate) && findTicket.getTmoney().equals(tmoney)) {
                    //数据相同 验证成功 添加验证表
                    findTicket.setTchecked("1");//设置此发票验证通过
                    //TODO 没添加验证人
                    check.setCheckreason("数据一致");
                    check.setCheckresult("1");//1为发票通过
                    ticketService.updateTicket(findTicket);
                    checkService.insertCheck(check);
                    flag = "1";
                } else {
                    //验证失败
                    check.setCheckresult("-1");
                    check.setCheckreason("数据出错");
                    checkService.insertCheck(check);
                    flag = "01";
                }

            }
//            return flag + "," +check.getChecktime() ;
        } else {
//          发票第一次录入
            Ticket ticket = new Ticket();
            ticket.setTnumber(tnumber);
            ticket.setTmoney(tmoney);
            ticket.setTcode(tcode);
            ticket.setTdate(tdate);
            ticket.setTcheckcode(tcheckcode);
            ticket.setTchecked("0");
            ticketService.insetTicket(ticket);
        }
        return flag;
    }

    public List<TicketCheck> rtTicketChecks (List<TicketCheck> ticketChecks){
        if(ticketChecks!=null &&ticketChecks.size()>0){
            SimpleDateFormat sdf =  new SimpleDateFormat("yyyy-MM-dd");
            for(TicketCheck ticketCheck : ticketChecks){
                ticketCheck.setChecktimeFormat(sdf.format(ticketCheck.getChecktime()));
                String checkresult = ticketCheck.getCheckresult();
                if (checkresult.equals("1")) {
                    ticketCheck.setCheckresult("是");
                } else {
                    ticketCheck.setCheckresult("否");
                }
            }
            TicketCheck ticketCheck = new TicketCheck();
            ticketCheck.setTcode("发票代码");
            ticketCheck.setTmoney("税前金额");
            ticketCheck.setTnumber("发票号码");
            ticketCheck.setTcheckcode("校验码");
            ticketCheck.setTdate("开票时间");
            ticketCheck.setCheckresult("是否通过");
            ticketCheck.setCheckreason("检验理由");
            ticketCheck.setCheckuser("检验人");
            ticketCheck.setChecktimeFormat("检验时间");
            ticketChecks.add(0, ticketCheck);
            return ticketChecks;
        }else {
            return null;
        }

    }

//    //解码
//    @RequestMapping("decoderQRCode")
//    public @ResponseBody
//    String decoderQRCode(@RequestBody Map<String, String> map) {
//        String time = map.get("time");
//        byte[] bytes;//储存base64解码
//        //获取图片的base64
//        String imgStr = map.get("img");
//        if (imgStr == null) // 图像数据为空
//        {
//            return "";
//        }
//        BASE64Decoder decoder = new BASE64Decoder();
//        try {
//            // Base64解码
//            bytes = decoder.decodeBuffer(imgStr);//解码
//            for (int i = 0; i < bytes.length; ++i) {
//                if (bytes[i] < 0) {// 调整异常数据
//                    bytes[i] += 256;
//                }
//            }
//        } catch (Exception e) {
//            return "";
//        }
//        //将字节写入流
//        ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(bytes);
//        try {
//            FileOutputStream fileOutputStream = new FileOutputStream("D:test.png");
//            fileOutputStream.write(bytes);
//            System.out.println("图片保存成功");
//        } catch (FileNotFoundException e) {
//            e.printStackTrace();
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//        MultiFormatReader formatReader = new MultiFormatReader();
////        File file = new File("D:/img2.png");
//        BufferedImage image = null;
//        try {
//            image = ImageIO.read(byteArrayInputStream);
////            image = ImageIO.read(file);
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//
//        BinaryBitmap binaryBitmap = new BinaryBitmap(new HybridBinarizer(new BufferedImageLuminanceSource(image)));
//
//
//        //定义二维码的参数:
//        HashMap hints = new HashMap();
//        hints.put(EncodeHintType.CHARACTER_SET, "utf-8");//定义字符集
//
//        Result result = null;//开始解析
//        try {
//
//            result = formatReader.decode(binaryBitmap, hints);//0:x ,1:x,2:发票代码(),3:发票号码(),4:金额() ,5:时间() ,6:校验码  ,7:x
//            String[] split = result.getText().split(",");
//            String tnumber = split[3];
//            String tcode = split[2];
//            String tmoney = split[4];
//            String tdate = split[5];
//            String tcheckcode = split[6];
//            this.check(tnumber, tcode, tdate, tmoney, tcheckcode);
//        } catch (NotFoundException e) {
//            e.printStackTrace();
//            return "";
//        }
//        if (result != null) {
//            System.out.println("解析结果:" + result.toString());
//            System.out.println("二维码的格式类型是:" + result.getBarcodeFormat());
//            System.out.println("二维码的文本内容是:" + result.getText());
//        }
//        return " ";
//    }
}

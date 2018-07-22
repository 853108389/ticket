<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<HTML>
<HEAD>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0,minimum-scale=1.0, maximum-scale=1.0,user-scalable=no">
    <%--<link rel="stylesheet" href="${pageContext.request.contextPath}/css/demo.css" type="text/css">--%>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/zTreeStyle/zTreeStyle.css" type="text/css">
    <style>
        .container{
            margin: 0 auto;
        }

    </style>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.ztree.core.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.ztree.excheck.min.js"></script>
    <SCRIPT type="text/javascript">
        var setting = {
            check: {
                enable: true
            },
            data: {
                simpleData: {
                    enable: true
                }
            }
        };

        var zNodes =[
            { id:1, pId:0, name:"随意勾选 1", open:true},
            { id:11, pId:1, name:"随意勾选 1-1", open:true},
            { id:111, pId:11, name:"随意勾选 1-1-1"},
            { id:112, pId:11, name:"随意勾选 1-1-2"},
            { id:12, pId:1, name:"随意勾选 1-2", open:true},
            { id:121, pId:12, name:"随意勾选 1-2-1"},
            { id:122, pId:12, name:"随意勾选 1-2-2"},
            { id:2, pId:0, name:"随意勾选 2", open:true},
            { id:21, pId:2, name:"随意勾选 2-1"},
            { id:22, pId:2, name:"随意勾选 2-2", open:true},
            { id:221, pId:22, name:"随意勾选 2-2-1"},
            { id:222, pId:22, name:"随意勾选 2-2-2"},
            { id:23, pId:2, name:"随意勾选 2-3"}
        ];

        var code;

        function setCheck() {
            var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
                type = { "Y": "ps", "N": "ps" };
            zTree.setting.check.chkboxType = type;
        }
        function showCode(str) {
            if (!code) code = $("#code");
            code.empty();
            code.append("<li>"+str+"</li>");
        }


        $(document).ready(function(){
            var roleName ="";
            var description = "";
            var permissionList = [];
            $.ajax({
                type: "POST",
                url: "${pageContext.request.contextPath}/user/fetchRolePermByUserId.do",
                async:false,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify({"userId":1}),
                success: function (data) {
//                    alert(Object.keys(data))
                    roleName = data.roleList[0].rname;
                    description = data.roleList[0].description;
                    permissionList =data.roleList[0].permissionList;
                    var zNodes2 = [];
                    for(var i = 0 ; i < permissionList.length ;i ++){
                        var zNodesObject ={};
                        zNodesObject.id = permissionList[i].id;
                        zNodesObject.pId =permissionList[i].parentid;
                        if(zNodesObject.pId==0){
                            zNodesObject.open = true;
                        }
                        zNodesObject.name =permissionList[i].pname;
                        zNodesObject. font={'background-color':'black', 'color':'white'};
                        zNodes2.push(zNodesObject);
                    }
                    $.fn.zTree.init($("#treeDemo"), setting, zNodes2);
                    setCheck();
                    $("#roleList").html( "<p >你拥有的角色有: " +roleName +"</p>");
                }
            });

//            $.fn.zTree.init($("#treeDemo"), setting, zNodes);
//            setCheck();

        });
    </SCRIPT>
</HEAD>

<BODY>
    <div class="container">
        <div id="roleList"></div>
        <ul id="treeDemo" class="ztree"></ul>
    </div>
</BODY>
</HTML>
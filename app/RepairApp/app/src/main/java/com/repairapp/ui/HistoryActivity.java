package com.repairapp.ui;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import android.app.ActionBar;
import android.app.Activity;
import android.app.AlertDialog;
import android.app.AlertDialog.Builder;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.os.StrictMode;
import android.support.v4.app.NavUtils;
import android.support.v4.app.TaskStackBuilder;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.ListView;
import android.widget.SimpleAdapter;
import android.widget.Toast;

import com.repairapp.tool.HttpConfig;
import com.repairapp.tool.JsonParse;
import com.repairapp.tool.Orders;

public class HistoryActivity extends Activity {

	private ListView mListView;
	SimpleAdapter _Adapter = null;
	List<HashMap<String, Object>> data = new ArrayList<HashMap<String, Object>>();
	HashMap<String, String> map = new HashMap<String, String>();
    private String username;

	private static final String TAG = "MainActivity";

	private List<Orders> orders;

	@Override
	public void onCreate(Bundle savedInstanceState) {

		// 设置线程的策略
		StrictMode.setThreadPolicy(new StrictMode.ThreadPolicy.Builder()
				.detectDiskReads().detectDiskWrites().detectNetwork()
				.penaltyLog().build());
		// 设置虚拟机的策略
		StrictMode.setVmPolicy(new StrictMode.VmPolicy.Builder()
				.detectLeakedSqlLiteObjects().penaltyLog().penaltyDeath()
				.build());
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_history);
		ActionBar actionBar = getActionBar();  
	    actionBar.setDisplayHomeAsUpEnabled(true); 
		Intent intent = getIntent();
		username = intent.getStringExtra("username");
		mListView = (ListView) findViewById(R.id.listView);
		listClick();
		mListView.setOnItemClickListener(new OnItemClickListenerImpl());
	}
	
	public void orderJson(String url){
		try {

			// 得到Json解析成功之后数据
			orders = JsonParse.getListPerson(url);
			for (int i = 0; i < orders.size(); i++) {

				HashMap<String, Object> map = new HashMap<String, Object>();

				map.put("orders", orders.get(i).getOrders());
				map.put("thing", orders.get(i).getThing());
				map.put("describes", orders.get(i).getDescribes());
				map.put("address", orders.get(i).getAddress());
				map.put("name", orders.get(i).getName());
				map.put("tel", orders.get(i).getTel());
				map.put("time", orders.get(i).getTime());
				map.put("state", orders.get(i).getState());
				data.add(map);
			}
		} catch (Exception e) {
			Toast.makeText(HistoryActivity.this, "获取数据失败！", 2000).show();
			Log.i(TAG, e.toString());
		}

	}

	//加载列表数据
	public void listClick() {
		String urlPath = HttpConfig.history_url + "username=" + username;
		orderJson(urlPath);
		
		// 初始化适配器，并且绑定数据
		_Adapter = new SimpleAdapter(HistoryActivity.this, data,
				R.layout.itemlayout, new String[] { "orders",

				"thing", "name", "state" }, new int[] { R.id.orders,
						R.id.thing, R.id.name, R.id.state });
		mListView.setAdapter(_Adapter);

	}

	//获取某一工单号的工单详细信息
	public void order_info(String order) {
		
			String url = HttpConfig.order_url+"order=" + order;
			try {

				// 得到Json解析成功之后数据
			orders = JsonParse.getListPerson(url);
			for (int i = 0; i < orders.size(); i++) {
				map.put("orders", orders.get(i).getOrders());
				map.put("thing", orders.get(i).getThing());
				map.put("describes", orders.get(i).getDescribes());
				map.put("address", orders.get(i).getAddress());
				map.put("name", orders.get(i).getName());
				map.put("tel", orders.get(i).getTel());
				map.put("time", orders.get(i).getTime());
				map.put("state", orders.get(i).getState());

			}
			} catch (Exception e) {
				Toast.makeText(HistoryActivity.this, "获取数据失败！", 2000).show();
				Log.i(TAG, e.toString());
			}
	}
	
	
	//每行单击事件响应监听
	private class OnItemClickListenerImpl implements OnItemClickListener {

		@SuppressWarnings("unchecked")
		@Override
		public void onItemClick(AdapterView<?> parent, View view, int position,
				long id) {
			Map<String, String> mapItem = (Map<String, String>) HistoryActivity.this._Adapter
					.getItem(position);
			String order = mapItem.get("orders");
			order_info(order);
			//String name = map.get("describes");
			StringBuilder sb = new StringBuilder();
			sb.append("报修物品: " + map.get("thing") + "\n"+ "\n");
			sb.append("故障描述: " + map.get("describes") + "\n"+ "\n");
			sb.append("报修地点: " + map.get("address") + "\n"+ "\n");
			sb.append("报修人员: " + map.get("name") + "\n"+ "\n");
			sb.append("联系电话: " + map.get("tel") + "\n"+ "\n");
			sb.append("报修时间: " + map.get("time") + "\n"+ "\n");
			sb.append("报修工单: " + map.get("orders") + "\n"+ "\n");
			sb.append("维修状态: " + map.get("state") + "\n");

			AlertDialog.Builder builder = new Builder(HistoryActivity.this);
			builder.setTitle(order + "工单详细信息")
					.setMessage(sb.toString())
					.setPositiveButton("确定",
							new DialogInterface.OnClickListener() {

								@Override
								public void onClick(DialogInterface dialog,
										int which) {
									dialog.dismiss();

								}
							}).create().show();
		}
	}
	@Override
	protected void onDestroy() {
		super.onDestroy();
	}
	
	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		// Handle action bar item clicks here. The action bar will
		// automatically handle clicks on the Home/Up button, so long
		// as you specify a parent activity in AndroidManifest.xml.
		 switch (item.getItemId()) {  
		    case android.R.id.home:  
		        Intent upIntent = NavUtils.getParentActivityIntent(this);  
		        if (NavUtils.shouldUpRecreateTask(this, upIntent)) {  
		            TaskStackBuilder.create(this)  
		                    .addNextIntentWithParentStack(upIntent)  
		                    .startActivities();  
		        } else {  
		            upIntent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);  
		            NavUtils.navigateUpTo(this, upIntent);  
		        }  
             return true;  
     }  
     return super.onOptionsItemSelected(item);  
	}
}

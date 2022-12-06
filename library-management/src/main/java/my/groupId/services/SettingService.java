package my.groupId.services;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import my.groupId.handleException.HandleNullValue;
import my.groupId.handleException.Message;
import my.groupId.jooq.tables.records.SettingRecord;
import my.groupId.models.Setting;
import my.groupId.queries.SettingQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SettingService {
  @Autowired
  SettingQuery settingQuery;

  public Response getSetting(){
    try{
      var setting = settingQuery.queryGetSetting();
      return Response.ok(setting).build();
    } catch (Exception e) {
      return Response.status(Status.BAD_REQUEST).entity(new Message(e.getMessage())).build();
    }
  }

  public Response getSetting(Long id){
    try{
      Setting setting = settingQuery.queryGetSetting(id);
      return Response.ok(setting).build();
    } catch (Exception e) {
      return Response.status(Status.BAD_REQUEST).entity(new Message(e.getMessage())).build();
    }
  }

  public Response updateSetting(Setting setting) {
    try{
      if (!settingQuery.queryUpdateSetting(setting)) throw new HandleNullValue("Update setting failed");
      return Response.ok(new Message("Update setting successful")).build();
    } catch (Exception e) {
      return Response.status(Status.BAD_REQUEST).entity(new Message(e.getMessage())).build();
    }
  }
}

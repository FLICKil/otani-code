package my.groupId.controllers;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.ws.rs.core.Response;
import my.groupId.models.Setting;
import my.groupId.services.SettingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/setting")
public class SettingController {
  private final SettingService settingService;

  @Autowired
  public SettingController(SettingService settingService){ this.settingService = settingService;}

  @GetMapping
  public Response getSetting(){
    return settingService.getSetting();
  }

  @GetMapping("/{id}")
  public Response getSetting(@PathVariable Long id){
    return settingService.getSetting(id);
  }

  @PatchMapping("/{id}")
  public Response updateSetting(@PathVariable Long id,@RequestBody Setting setting){
    return settingService.updateSetting(setting);
  }
}

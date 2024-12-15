package calendar.app.controller;

import calendar.app.mapper.data.Events;
import calendar.app.service.ScheduleService;
import java.time.LocalDate;
import java.time.Month;
import java.time.Year;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RequestMapping("/calendar")
public class ScheduleController {

  @Autowired
  private ScheduleService service;

  @GetMapping
  public String showCalendar() {
    return "calendar"; // calendar.htmlを表示
  }

  @PostMapping("/register")
  public ResponseEntity<List<Events>> registerEvents(@RequestBody Events events) {
    List<Events> registerEvents = service.registerEvents(events);
    return new ResponseEntity<>(registerEvents, HttpStatus.OK);
  }

  @GetMapping("/eventsList")
  @ResponseBody
  public List<Events> searchEventsList() {
    return service.searchEventsList();
  }

  @GetMapping("/eventsTitle")
  @ResponseBody
  public List<Events> searchEventsTitle(@RequestParam String title) {
    return service.searchTitleList(title);
  }

  @GetMapping("/eventsDate")
  @ResponseBody
  public List<Events> searchEventsDate(@RequestParam int year, @RequestParam int month) {
    return service.searchDateList(year, month);
  }

  @DeleteMapping("/delete")
  @ResponseBody
  public void deleteEvents(@RequestParam int id) {
    service.deleteEvents(id);
  }
}

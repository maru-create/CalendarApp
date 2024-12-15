package calendar.app.service;

import calendar.app.mapper.EventsMapper;
import calendar.app.mapper.data.Events;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ScheduleService {

  @Autowired
  private EventsMapper mapper;

  public List<Events> searchEventsList() {
    return mapper.selectEventsList();
  }

  public List<Events> searchTitleList(String title) {
    return mapper.selectTitleList(title);
  }

  public List<Events> searchDateList(int year, int month) {
    return mapper.selectDateList(year, month);
  }

  public List<Events> registerEvents(Events events) {
    mapper.insertEvents(events);
    return mapper.selectTitleList(events.getTitle());
  }

  public void deleteEvents(int id) {
    mapper.deleteEvents(id);
  }

}

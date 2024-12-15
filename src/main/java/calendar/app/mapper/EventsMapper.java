package calendar.app.mapper;

import calendar.app.mapper.data.Events;
import java.util.List;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface EventsMapper {

  @Select("select * from events")
  List<Events> selectEventsList();

  @Select("select * from events where title = #{title}")
  List<Events> selectTitleList(String title);

  @Select("select * from events where year(date) = #{year} and month(date) = #{month}")
  List<Events> selectDateList(int year, int month);

  @Insert("insert events(title, description, date) values(#{title}, #{description}, #{date})")
  void insertEvents(Events events);

  @Delete("delete from events where id = #{id}")
  void deleteEvents(int id);
}

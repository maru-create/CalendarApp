package calendar.app.mapper.data;

import java.time.LocalDate;
import java.util.Date;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Events {

  private int id;
  private String title;
  private String description;
  private LocalDate date;

}

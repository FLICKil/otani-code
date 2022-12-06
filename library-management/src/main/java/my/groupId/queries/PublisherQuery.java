package my.groupId.queries;

import static my.groupId.jooq.tables.Publisher.PUBLISHER;

import java.util.List;
import javax.enterprise.context.ApplicationScoped;
import my.groupId.jooq.tables.records.PublisherRecord;
import my.groupId.models.Publisher;
import org.jooq.DSLContext;
import org.springframework.beans.factory.annotation.Autowired;

@ApplicationScoped
public class PublisherQuery {
  @Autowired DSLContext query;
  @Autowired BookQuery bookQuery;

  public List<Publisher> queryGetPublisher() {
    return query
        .selectFrom(PUBLISHER)
        .fetch(
            row -> {
              return new Publisher(
                  row.getId(),
                  row.getName(),
                  row.getCreatedat(),
                  row.getUpdatedat(),
                  row.getCreatedby(),
                  row.getUpdatedby());
            });
  }

  public Publisher queryGetPublisher(Long id) {
    PublisherRecord row = query.selectFrom(PUBLISHER).where(PUBLISHER.ID.eq(id)).fetchOne();
    if (row == null) return null;
    return new Publisher(
        row.getId(),
        row.getName(),
        row.getCreatedat(),
        row.getUpdatedat(),
        row.getCreatedby(),
        row.getUpdatedby());
  }

  public boolean queryCreatePublisher(Publisher author) {
    PublisherRecord checkExist =
        query.selectFrom(PUBLISHER).where(PUBLISHER.NAME.eq(author.getName())).fetchOne();

    if (checkExist != null) return false;
    query.insertInto(PUBLISHER, PUBLISHER.NAME).values(author.getName()).execute();
    return true;
  }

  public boolean queryUpdatePublisher(Long id, Publisher author) {
    int result =
        query
            .update(PUBLISHER)
            .set(PUBLISHER.NAME, author.getName())
            .where(PUBLISHER.ID.eq(id))
            .execute();
    return result != 0;
  }

  public int queryDeletePublisher(Long id) {
    var book = bookQuery.queryGetBookByPublisher(id);
    if (!book.isEmpty()) return 2;
    int result = query.delete(PUBLISHER).where(PUBLISHER.ID.eq(id)).execute();
    if (result == 1) return 1;
    else return 0;
  }
}

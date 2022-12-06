package my.groupId.services;

import java.util.List;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import my.groupId.handleException.HandleNullValue;
import my.groupId.handleException.Message;
import my.groupId.models.Category;
import my.groupId.queries.CategoryQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {
  @Autowired CategoryQuery categoryQuery;

  public Response getCategory() {
    try {
      List<Category> categories = categoryQuery.queryGetCategory();
      return Response.ok(categories).build();
    } catch (Exception e) {
      return Response.status(Status.BAD_REQUEST).entity(new Message(e.getMessage())).build();
    }
  }

  public Response getCategory(Long id) {
    try {
      Category category = categoryQuery.queryGetCategory(id);

      if (category == null) throw new HandleNullValue("This category is not exist");

      return Response.ok(category).build();
    } catch (Exception e) {
      return Response.status(Status.BAD_REQUEST).entity(new Message(e.getMessage())).build();
    }
  }

  public Response createCategory(Category category) {
    try {
      if (!categoryQuery.queryCreateCategory(category))
        throw new HandleNullValue("This category is already existed");
      return Response.ok(new Message("Category is successful created")).build();
    } catch (Exception e) {
      return Response.status(Status.BAD_REQUEST).entity(new Message(e.getMessage())).build();
    }
  }

  public Response updateCategory(Long id, Category category) {
    try {
      if (!categoryQuery.queryUpdateCategory(id, category))
        throw new HandleNullValue("This category is not existed");
      return Response.ok(new Message("Category is successful modified")).build();
    } catch (Exception e) {
      return Response.status(Status.BAD_REQUEST).entity(new Message(e.getMessage())).build();
    }
  }

  public Response deleteCategory(Long id) {
    try {
      int result = categoryQuery.queryDeleteCategory(id);
      if (result == 0) throw new HandleNullValue("This category is not exist");
      else if (result == 2)
        throw new HandleNullValue("Cannot delete category that is already in use.");
      return Response.ok(new Message("Category is deleted")).build();
    } catch (Exception e) {
      return Response.status(Status.BAD_REQUEST).entity(new Message(e.getMessage())).build();
    }
  }
}

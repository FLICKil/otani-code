package my.groupId.controllers;

import javax.ws.rs.core.Response;
import my.groupId.models.Category;
import my.groupId.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/category")
public class CategoryController {
  private final CategoryService categoryService;

  @Autowired
  public CategoryController(CategoryService categoryService) {
    this.categoryService = categoryService;
  }

  @GetMapping
  public Response getCategory() {
    return categoryService.getCategory();
  }

  @GetMapping("/{id}")
  public Response getCategory(@PathVariable Long id) {
    return categoryService.getCategory(id);
  }

  @PostMapping
  public Response createCategory(@RequestBody Category categoryDto) {
    return categoryService.createCategory(categoryDto);
  }

  @DeleteMapping("/{id}")
  public Response deleteCategory(@PathVariable Long id) {
    return categoryService.deleteCategory(id);
  }

  @PatchMapping("/{id}")
  public Response updateCategory(@PathVariable Long id, @RequestBody Category categoryDto) {
    return categoryService.updateCategory(id, categoryDto);
  }
}

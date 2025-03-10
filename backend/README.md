# ToDo API Documentation

This document describes the API endpoints for the ToDo application.

## Endpoints

### GET /api/todo/all

Retrieves all ToDo items.

**Response:**

```json
[
  {
    "id": 1,
    "label": "Task 1",
    "checked": false
  },
  {
    "id": 2,
    "label": "Task 2",
    "checked": true
  },
  // ... more items
]
```

### GET /api/todo/count

Retrieves the total number of ToDo items.

**Response:**

```json
{
  "count": 2
}
```

### POST /api/todo/count

Counts the number of ToDo items with a specific label.

**Request Body:**

```json
{
  "label": "Task 1"
}
```

**Response:**

```json
{
  "count": 1
}
```

### POST /api/todo/find

Retrieves a list of ToDo items with a specific label.

**Request Body:**

```json
{
  "label": "Task 1"
}
```

**Response:**

```json
[
  {
    "id": 1,
    "label": "Task 1",
    "checked": false
  }
]
```

### POST /api/todo

Create a new ToDo item.

**Request Body:**

```json
{
  "label": "Updated Task",
  "checked": true
}
```

**Response:**

```json
{
  "message": "Item created successfully"
}
```

### POST /api/todo/:idx

Updates a ToDo item at a given index.

**Request Body:**

```json
{
  "label": "Updated Task",
  "checked": true
}
```

**Response:**

```json
{
  "message": "Item updated successfully"
}
```

**Path Parameter:**

-   `idx`: The index of the item to update (0-based).

### POST /api/todo/clean

Removes all ToDo items with `checked: true`.

**Response:**

```json
{
  "message": "1 items removed"
}
```

## Error Handling

-   **400 Bad Request:** Occurs when the request body does not match the expected schema (Zod validation errors).
-   **404 Not Found:** Occurs when trying to update an item with an invalid index.
-   **500 Internal Server Error:** Occurs for unexpected server errors.

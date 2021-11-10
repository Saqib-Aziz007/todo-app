const columns = [
  { title: "Id", dataIndex: "id", key: "id" },
  { title: "Title", dataIndex: "title", key: "title" },
  {
    title: "Action",
    dataIndex: "",
    key: "x",
    render: (_, object) => (
      <Space size="middle">
        <a>
          <EditOutlined
            style={{ color: "blue" }}
            onClick={() => onEditAction(object)}
          />
        </a>
        <a>
          <DeleteOutlined
            style={{ color: "red" }}
            onClick={() => onDeleteAction(object)}
          />
        </a>
      </Space>
    ),
  },
];

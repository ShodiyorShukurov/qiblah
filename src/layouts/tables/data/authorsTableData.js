import Icon from "@mui/material/Icon";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
import Switch from "@mui/material/Switch";
import useNews from "hooks/UseNews";

const AuthorsTable = ({ handleEdit, handleEditStatus }) => {
  const { data } = useNews();

  const updatedRows = data
    ? data.map((news) => ({
        id: news.news_id,
        title: news.news_title,
        description: news.news_description.slice(0, 10) + "...",
        language: news.news_lang,
        image: (
          <SoftAvatar
            src={news.news_image_link}
            alt={news.news_title}
            size="sm"
            variant="rounded"
          />
        ),
        button: (
          <SoftBadge
            variant="gradient"
            badgeContent={news.news_button_text}
            href={news.news_link}
            size="xs"
            container
          />
        ),
        views: news.news_views,
        like: news.news_like,
        active: <Switch checked={news.news_active} onChange={() => handleEditStatus(!news.news_active, news.news_id)} />,
        action: (
          <SoftBox mr={1}>
            <SoftButton variant="text" color="dark" onClick={() => handleEdit(news)}>
              <Icon>edit</Icon>
            </SoftButton>
            <SoftButton variant="text" color="error">
              <Icon>delete</Icon>
            </SoftButton>
          </SoftBox>
        ),
      }))
    : [];

  const columns = [
    { name: "id", align: "center" },
    { name: "title", align: "center" },
    { name: "description", align: "center" },
    { name: "language", align: "center" },
    { name: "image", align: "center" },
    { name: "button", align: "center" },
    { name: "views", align: "center" },
    { name: "like", align: "center" },
    { name: "active", align: "center" },
    { name: "action", align: "center" },
  ];

  return { columns, updatedRows };
};

export default AuthorsTable;

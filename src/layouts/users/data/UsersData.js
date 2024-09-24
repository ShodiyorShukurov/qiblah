import Icon from "@mui/material/Icon";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import Switch from "@mui/material/Switch";


const UsersData = (data) => {
 
  const updatedRows = data
    ? data.map((user, index) => ({
        "№": index + 1,
        "user id": user.user_id,
        "user name": user.user_name,
        "user gender": user.user_gender,
        "user phone number": user.user_phone_number ? (
          user.user_phone_number
        ) : (
          <span className="text-warning">Mavjud emas</span>
        ),
        premium: (
          <Switch
            checked={user.user_premium}
            // onChange={() => handleEditStatus(!news.news_active, news.news_id)}
          />
        ),
        "Select User for delete": (
          <Switch
            // checked={user.user_id}
            // onChange={() => handleEditStatus(!news.news_active, news.news_id)}
          />
        ),
        action: (
          <SoftBox mr={1}>
            <SoftButton variant="text" color="dark">
              <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small">
                more_vert
              </Icon>
            </SoftButton>

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
    { name: "№", align: "center" },
    { name: "user id", align: "center" },
    { name: "user name", align: "center" },
    { name: "user gender", align: "center" },
    { name: "user phone number", align: "center" },
    { name: "premium", align: "center" },
    { name: "Select User for delete", align: "center" },
    { name: "action", align: "center" },
  ];

  return { columns, updatedRows };
};

export default UsersData;

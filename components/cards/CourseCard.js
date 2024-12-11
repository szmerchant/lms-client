import { Card, Badge } from "antd";
import Link from "next/link";
import { currencyFormatter } from "../../utils/helpers";

const { Meta } = Card;

const CourseCard = ({ course }) => {
    const { name, instructor, price, image, slug, paid, category } = course;
    return (
        <Link href={`/course/${slug}`} legacyBehavior>
            <a style={{ textDecoration: "none", color: "inherit" }}>
                <Card
                    className="mb-4"
                    style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }} // Reduces white space
                    cover={
                        <img
                            src={image.Location}
                            alt={name}
                            style={{ height: "200px", objectFit: "cover", width: "100%" }} // Consistent image sizing
                            className="p-1"
                        />
                    }
                >
                    <div>
                        <h2 className="font-weight-bold" style={{ marginBottom: "10px" }}>{name}</h2>
                        <p style={{ marginBottom: "8px" }}>by {instructor.name}</p>
                        <Badge
                            count={category}
                            style={{ backgroundColor: "#03a9f4" }}
                            className="pb-2 mr-2"
                        />
                    </div>
                    <h4 className="pt-2" style={{ marginTop: "10px" }}>
                        {paid
                            ? currencyFormatter({
                                amount: price,
                                currency: "usd",
                            })
                            : "Free"}
                    </h4>
                </Card>
            </a>
        </Link>
    );
};

export default CourseCard;
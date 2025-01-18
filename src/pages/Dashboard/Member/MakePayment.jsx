import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../Loading";
import { Link } from "react-router-dom";


const MakePayment = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
      const { data = {}, isLoading } = useQuery({
        queryKey: ["agreement", user.email],
        queryFn: async () => {
          const res = await axiosSecure.get(`agreement/${user.email}`);
          return res.data;
        },
      });
    // console.log(data);

      if (isLoading) return <Loading />;
    return (
      <div>
        make payment
        <form className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              defaultValue={user.email}
              className="input input-bordered"
              required
              readOnly
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Floor</span>
            </label>
            <input
              type="email"
              defaultValue={data.floorNo}
              className="input input-bordered"
              required
              readOnly
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Block</span>
            </label>
            <input
              type="email"
              defaultValue={data.blockName}
              className="input input-bordered"
              required
              readOnly
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">apartmentNo</span>
            </label>
            <input
              type="email"
              defaultValue={data.apartmentNo}
              className="input input-bordered"
              required
              readOnly
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Rent</span>
            </label>
            <input
              type="email"
              defaultValue={data.rent}
              className="input input-bordered"
              required
              readOnly
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Select Month</span>
            </label>
            <select className="select select-bordered" required>
              <option value="">--Select Month--</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-primary"><Link to='/dashboard/payment'>Pay</Link></button>
          </div>
        </form>
      </div>
    );
};

export default MakePayment;
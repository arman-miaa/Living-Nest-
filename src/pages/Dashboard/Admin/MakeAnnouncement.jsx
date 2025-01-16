import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const MakeAnnouncement = () => {
    const axiosSecure = useAxiosSecure();

    const handleSubmitForm = (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        // console.log(title, description);
        
        const announcement = {
            title,
            description,
        }

        axiosSecure.post("/announcements", announcement)
            .then(res => {
            console.log('announcement upload successfully', res.data);
            })
            .catch(errro => {
            console.log('announcement uploaded failed', errro);
        })
    }
    return (
      <div>
        make announcement ...
        <form onSubmit={handleSubmitForm} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              placeholder="Title"
              name="title"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              className="textarea textarea-bordered resize-none"
                        placeholder="description"
                        name="description"
            ></textarea>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    );
};

export default MakeAnnouncement;
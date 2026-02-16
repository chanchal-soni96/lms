import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreateLectureMutation,
  useGetCourseLectureQuery,
} from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Lecture from "./Lecture";

const CreateLecture = () => {
  // ---------- STATE ----------
  const [lectureTitle, setLectureTitle] = useState("");

   // ---------- HOOKS ----------
  //Params use for get couse Id.....
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();

    // ---------- API CALLS ----------
  const [createLecture, { data, isLoading, isSuccess, error }] =
    useCreateLectureMutation();
  //Get getCreateLectureData......
  const {
    data: lectureData,
    isLoading: lectureLoading,
    isError: lectureError,
    //.......refetch use for fetching the created data.......... 
    refetch
  } = useGetCourseLectureQuery(courseId);

    // ---------- HANDLER/FUNCTIONS ----------
  // -----------CreateLecture-------------
  const CreateLectureHandler = async () => {
    //.........API Call(use RTK Query for calling API)..........
    await createLecture({ lectureTitle, courseId });
  };

  // ---------- useEffect(HOOK) ----------
  useEffect(() => {
    if (isSuccess) {
      refetch()
      toast.success(data.message);
    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error]);
  console.log(lectureData);

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Let's add lectures, add some basic details for your new lecture{" "}
        </h1>
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum,
          vero!
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Your Lecture Title name"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/course/${courseId}`)}
          >
            Back to course
          </Button>
          <Button disabled={isLoading} onClick={CreateLectureHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Create lecture"
            )}
          </Button>
        </div>
        <div className="mt-10">
          {lectureLoading ? (
            <p>Loading lecture...</p>
          ) : lectureError ? (
            <p>Failed to load lectures</p>
          ) : lectureData.lectures.length === 0 ? (
            <p>No lectures available</p>
          ) : (
            lectureData.lectures.map((lecture, index) => (
              <Lecture key={lecture._id} lecture={lecture} index={index} courseId={courseId} />
              
            ))
               
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;

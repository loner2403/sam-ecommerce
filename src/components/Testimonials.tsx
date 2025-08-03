import React from 'react';
import { Card, CardContent, CardTitle } from "./ui/card";

const testimonials = [
  {
    title: 'Exceptional Quality',
    text: '"The gas burner I purchased from FlameMaster is fantastic. It heats up quickly and cooks evenly. Highly recommend!" - Sarah Miller',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNyv9ACRxS02mup7vabO4DHiMjLTwZ5vLsPd0JU6ZdQeJfMTyl7LK5jSS-mMLjaS5j-IgYMH2RJa0lD6L2YcVFVrCMLdUTPa0ml_tLMIzikbXDEuEVXE090NVoUYkZAo6MW2juxJZJhRhzkdFULVusW1v3IDWkJKGzlbO-NZzwGbLkYMmf_UMEDvsUq3Gx47duF8Ln_Sx0Gag6AhwyDcnDxRIbgMQz_7SdBtUOYQlt47N4HWLmhHrsQs1rjelqS4pJa7J7WBz74aMC',
  },
  {
    title: 'Reliable Performance',
    text: '"I\'ve been using FlameMaster products for years, and they never disappoint. Their burners are durable and efficient." - David Lee',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJi1IkT9seWVhmyi28J6--Le06uWamlgfjygO9AbXmvVuU5mKODsoPcb-wefodTVwHkKsFKes3uwR5tzzUUYERKvdJeonDkX2JHNN4umex8QeBfav1n7GZshILpaprCwGbT72hdO3NCen0HcDPZkz6MlT_MUJ-oxyNQd6_myQliUOg7Pb0_KbsRtkFiq83BMZft9akfgs6o24Co5sTm5yKN7UbGCsXY2gVw_bHUMSnas6Fof45lBAHVVQWs6bYdrqI_6XUZNY3fC_3',
  },
  {
    title: 'Great Value',
    text: '"FlameMaster offers great value for money. Their products are well-built and perform excellently. I\'m very satisfied with my purchase." - Emily Chen',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtO5s8jYYMAQMuJyYHnSSTZjYqDmiGJBAKtbOGG0ErVhGu-hz-EAto0pCnNx5m2K8W-Vl814UZ78zTX1QH7LopoDK71rGw6WvtoDd5PYoDwt-zo8T-sqkntVq19G2FBgviBUl7e7A2Ltd3Iit56GCKqK0FWre-CoFokNGjLj4fG8wVBXhbS8lxPmi_X7mTzfVyF8Wft-MXZQR_VG1GGTkjYcnXQWVsH54rxPgbUivSc9ClM4qWfHGLrQukpojYxyKka117N9B8S4sV',
  },
];

const Testimonials = () => (
  <>
    <h2 className="text-[#181311] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Customer Testimonials</h2>
    <div className="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex items-stretch p-4 gap-3">
        {testimonials.map((testimonial, idx) => (
          <Card key={idx} className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60">
            <div
              className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg flex flex-col"
              style={{ backgroundImage: `url('${testimonial.image}')` }}
            ></div>
            <CardContent className="p-0">
              <CardTitle className="text-[#181311] text-base font-medium leading-normal">{testimonial.title}</CardTitle>
              <p className="text-[#886f63] text-sm font-normal leading-normal">{testimonial.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </>
);

export default Testimonials; 